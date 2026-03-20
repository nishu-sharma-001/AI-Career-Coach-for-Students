
from __future__ import annotations

import math
import re
from collections import Counter

from career_data import CAREER_INTEREST_MAP, CAREER_PATHS
from career_data import CAREER_INTEREST_MAP, CAREER_PATHS, INTERVIEW_PLAYBOOK


def normalize_skills(skills_text: str) -> list[str]:
    return cleaned


def _skill_set(skills: list[str]) -> set[str]:
    return {skill.lower() for skill in skills}


def recommend_careers(interests: list[str], skills: list[str], resume_text: str) -> list[str]:
    scores = Counter()
    skills_lower = {skill.lower() for skill in skills}
    skills_lower = _skill_set(skills)
    resume_lower = (resume_text or "").lower()

    for interest in interests:
        target_skills.extend(CAREER_PATHS[role]["required_skills"])

    missing_skills = [
        skill for skill in dict.fromkeys(target_skills) if skill.lower() not in {item.lower() for item in skills}
        skill for skill in dict.fromkeys(target_skills) if skill.lower() not in _skill_set(skills)
    ]

    feedback = [
    improvements = [
        "Add at least 2 project descriptions with measurable outcomes.",
        "Highlight tools, programming languages, and platforms in a dedicated skills section.",
        "Use role-specific keywords to improve ATS matching for placement drives.",
    ]
    if "github" not in lower_text:
        feedback.append("Include your GitHub or portfolio link for stronger recruiter trust.")
        improvements.append("Include your GitHub or portfolio link for stronger recruiter trust.")

    strengths = []
    if "project" in lower_text:
        strengths.append("Projects are already present, which helps shortlist quality.")
    if any(word in lower_text for word in ["intern", "experience"]):
        strengths.append("Experience signals are visible in the resume.")
    if any(char.isdigit() for char in resume_text):
        strengths.append("Quantified points make the resume feel more credible.")
    if not strengths:
        strengths.append("Resume has clear intent and can become much stronger with better structuring.")

    return {
        "ats_score": score,
        "missing_skills": missing_skills[:6],
        "feedback": feedback[:4],
        "feedback": improvements[:4],
        "strengths": strengths[:3],
    }


def calculate_salary_estimate(primary_role: str, skills: list[str], resume_text: str) -> dict:
    minimum, maximum = CAREER_PATHS[primary_role]["salary_range_lpa"]
    skill_boost = min(len(skills), 8) * 0.35
    resume_boost = 0.9 if "project" in (resume_text or "").lower() else 0
    predicted = round(minimum + skill_boost + resume_boost, 1)
    predicted = min(predicted, float(maximum))
    confidence = 62 + min(len(skills) * 4, 22)
    return {
        "role": primary_role,
        "predictedLpa": predicted,
        "rangeLpa": f"{minimum}-{maximum} LPA",
        "confidence": min(confidence, 90),
    }


def build_job_trends(recommended_roles: list[str]) -> list[dict]:
    trends = []
    for role in recommended_roles:
        details = CAREER_PATHS[role]
        trends.append(
            {
                "role": role,
                "growthIndex": details["growth_index"],
                "hiringSignal": details["hiring_signal"],
                "topDomains": details["top_domains"],
                "mustUseTools": details["tools"],
            }
        )
    return trends


def analyze_linkedin_profile(name: str, skills: list[str], linkedin_text: str, target_role: str) -> dict:
    linkedin_text = linkedin_text or ""
    lower_text = linkedin_text.lower()
    role_data = CAREER_PATHS[target_role]
    keyword_hits = sum(1 for skill in role_data["required_skills"] if skill.lower() in lower_text)
    headline_score = 20 if any(word in lower_text for word in ["aspiring", "developer", "analyst", "engineer"]) else 8
    project_score = 20 if "project" in lower_text else 5
    profile_score = min(100, 35 + headline_score + project_score + keyword_hits * 8 + len(skills) * 2)

    suggestions = [
        f"Write a headline aligned to {target_role} instead of a generic student label.",
        "Add 2 featured projects with problem, stack, and measurable impact.",
        "Use a keyword-rich About section that mentions skills, tools, and target domain.",
    ]
    if "linkedin.com" not in lower_text and linkedin_text.strip():
        suggestions.append("Add profile links, certifications, or portfolio URLs for stronger trust.")

    return {
        "profileScore": profile_score,
        "headline": f"{name} | Aspiring {target_role}",
        "keywordCoverage": min(100, keyword_hits * 20),
        "suggestions": suggestions[:4],
    }


def build_project_recommendations(role: str) -> list[str]:
    return CAREER_PATHS[role]["projects"]


def build_readiness_meter(ats_score: int, missing_skills: list[str]) -> dict:
    readiness = max(42, ats_score - len(missing_skills) * 4)
    level = "High" if readiness >= 78 else "Medium" if readiness >= 60 else "Early"
    return {"score": readiness, "level": level}


def generate_result(payload: dict) -> dict:
    name = payload.get("name", "Student").strip() or "Student"
    interests = payload.get("interests", [])
    skills = normalize_skills(payload.get("skills", ""))
    resume_text = payload.get("resumeText", "")
    linkedin_text = payload.get("linkedinText", "")

    recommended_roles = recommend_careers(interests, skills, resume_text)
    primary_role = recommended_roles[0]
    primary_track = CAREER_PATHS[primary_role]

    resume_feedback = build_resume_feedback(skills, resume_text, recommended_roles)
    current_skill_set = {skill.lower() for skill in skills}
    current_skill_set = _skill_set(skills)
    missing_for_primary = [
        skill for skill in primary_track["required_skills"] if skill.lower() not in current_skill_set
    ]

    readiness_meter = build_readiness_meter(resume_feedback["ats_score"], missing_for_primary)
    salary_estimate = calculate_salary_estimate(primary_role, skills, resume_text)

    return {
        "studentName": name,
        "currentSkills": skills,
        "resumeAnalysis": resume_feedback,
        "roadmap": primary_track["learning_path"],
        "interviewQuestions": primary_track["questions"],
        "salaryEstimate": salary_estimate,
        "jobTrends": build_job_trends(recommended_roles),
        "linkedinAnalysis": analyze_linkedin_profile(name, skills, linkedin_text, primary_role),
        "projectRecommendations": build_project_recommendations(primary_role),
        "readinessMeter": readiness_meter,
        "weeklyPlan": [
            "Week 1 -> Resume rewrite and GitHub cleanup",
            "Week 2 -> Build one target-role mini project",
            "Week 3 -> Solve 20 interview questions and 10 coding problems",
            "Week 4 -> Mock interviews, LinkedIn optimization, and referrals outreach",
        ],
    }


def score_mock_answer(answer: str, role: str) -> dict:
    answer = answer or ""
    word_count = len(answer.split())
    role_keywords = {skill.lower() for skill in CAREER_PATHS[role]["required_skills"]}
    hits = sum(1 for keyword in role_keywords if keyword in answer.lower())
    structure_bonus = 12 if any(token in answer.lower() for token in ["problem", "result", "impact", "learned"]) else 0
    score = min(95, 32 + min(word_count, 120) * 0.25 + hits * 6 + structure_bonus)
    score = int(math.floor(score))

    feedback = []
    if word_count < 45:
        feedback.append("Answer is too short. Add context, action, and result.")
    else:
        feedback.append("Answer length is solid for an interview response.")
    if hits < 2:
        feedback.append(f"Use more role-specific keywords for {role}.")
    else:
        feedback.append("You included relevant role keywords, which improves clarity.")
    if structure_bonus == 0:
        feedback.append("Use a STAR-style structure: situation, action, result.")
    else:
        feedback.append("Your response shows some structure and impact orientation.")

    return {"score": score, "feedback": feedback}


def generate_mock_interview(payload: dict) -> dict:
    role = payload.get("role") or "Software Engineer"
    answer = payload.get("answer", "")
    return {
        "role": role,
        "questions": INTERVIEW_PLAYBOOK["opening"] + CAREER_PATHS[role]["questions"]["technical"][:2] + INTERVIEW_PLAYBOOK["closing"][:1],
        "answerReview": score_mock_answer(answer, role),
    }

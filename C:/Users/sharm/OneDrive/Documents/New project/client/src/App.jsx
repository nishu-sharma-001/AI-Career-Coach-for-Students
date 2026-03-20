
const demoResume = `Final-year B.Tech student with strong interest in analytics and software.
Built a placement dashboard project and a student result management system.
Completed Java and HTML coursework with team project experience.
Looking for internships in data-driven or software roles.`;
Looking for internships in data-driven or software roles with measurable impact.`;

const demoLinkedin = `Aspiring data and software professional.
Built academic projects, participated in hackathons, and enjoy solving real-world problems.
Looking to grow in analytics, product engineering, and AI-driven systems.
Featured project: student performance dashboard with SQL and visualization.`;

const initialForm = {
  name: "Priya Sharma",
  skills: "Java, HTML, CSS, Communication",
  skills: "Java, HTML, CSS, SQL, Communication",
  interests: ["data", "software"],
  resumeText: demoResume,
  linkedinText: demoLinkedin,
};

const initialInterview = {
  role: "Software Engineer",
  answer:
    "In my recent project, the problem was that students could not track placement progress clearly. I built a dashboard using JavaScript and SQL, improved visibility, and learned how to turn feedback into better product decisions.",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [interviewForm, setInterviewForm] = useState(initialInterview);
  const [interviewResult, setInterviewResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewLoading, setIsInterviewLoading] = useState(false);
  const [error, setError] = useState("");
  const [interviewError, setInterviewError] = useState("");

  const toggleInterest = (interest) => {
    setForm((current) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleInterviewChange = (event) => {
    const { name, value } = event.target;
    setInterviewForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

      const data = await response.json();
      setResult(data);
      setInterviewForm((current) => ({
        ...current,
        role: data.skillGap.targetRole,
      }));
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
    }
  };

  const handleInterviewSubmit = async (event) => {
    event.preventDefault();
    setIsInterviewLoading(true);
    setInterviewError("");

    try {
      const response = await fetch("http://localhost:5000/api/mock-interview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(interviewForm),
      });

      if (!response.ok) {
        throw new Error("Unable to review the interview answer right now.");
      }

      const data = await response.json();
      setInterviewResult(data);
    } catch (err) {
      setInterviewError(err.message || "Something went wrong.");
    } finally {
      setIsInterviewLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <section className="hero">
      <section className="hero hero-advanced">
        <div className="hero-copy">
          <p className="eyebrow">Student Placement Intelligence</p>
          <h1>AI Career Coach that turns confusion into a clear placement plan.</h1>
          <p className="eyebrow">AI Placement Command Center</p>
          <h1>Advanced AI Career Coach for resume, roadmap, salary, and interview readiness.</h1>
          <p className="hero-text">
            Analyze resume strength, identify missing skills, discover best-fit roles, and
            generate a practical roadmap for placements and internships.
            This version feels closer to a product demo: one student profile generates role-fit
            recommendations, hiring signals, salary prediction, LinkedIn review, projects, and a
            mock interview evaluator.
          </p>
          <div className="hero-badges">
            <span>Resume Intelligence</span>
            <span>Skill Gap Mapping</span>
            <span>LinkedIn Audit</span>
            <span>Mock Interview</span>
          </div>
        </div>
        <div className="hero-card">
          <p className="mini-label">What recruiters notice</p>
          <ul>
            <li>ATS-friendly resume signals</li>
            <li>Industry skill-gap visibility</li>
            <li>Role-fit recommendations</li>
            <li>Interview preparation guidance</li>
          </ul>

        <div className="hero-stack">
          <div className="hero-card">
            <p className="mini-label">Advanced Modules</p>
            <ul>
              <li>ATS score and missing skills detection</li>
              <li>Career fit with readiness meter</li>
              <li>Salary estimate and trend intelligence</li>
              <li>Project ideas and 4-week execution plan</li>
            </ul>
          </div>
          <div className="hero-card accent-card">
            <p className="mini-label">Recruiter Value</p>
            <strong>AI + Full Stack + Career Data in one project</strong>
            <p className="small-copy">
              Perfect for portfolio, hackathons, major projects, and placement presentations.
            </p>
          </div>
        </div>
      </section>

      <section className="workspace">
      <section className="workspace advanced-workspace">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <div className="panel-heading">
            <h2>Student Profile</h2>
            <p>Fill this once and generate a complete AI mentor report.</p>
            <h2>Student Intelligence Input</h2>
            <p>Fill profile, resume text, and LinkedIn-style summary to generate a richer report.</p>
          </div>

          <label>
              value={form.skills}
              onChange={handleChange}
              rows="3"
              placeholder="Java, Python, SQL, HTML"
              placeholder="Java, Python, SQL, React, Power BI"
            />
          </label>

              name="resumeText"
              value={form.resumeText}
              onChange={handleChange}
              rows="8"
              rows="7"
              placeholder="Paste resume content here"
            />
          </label>

          <label>
            LinkedIn summary or profile text
            <textarea
              name="linkedinText"
              value={form.linkedinText}
              onChange={handleChange}
              rows="5"
              placeholder="Paste About section, headline, featured text, or profile copy"
            />
          </label>

          <button className="primary-button" type="submit" disabled={isLoading}>
            {isLoading ? "Analyzing profile..." : "Generate Career Report"}
            {isLoading ? "Generating advanced report..." : "Generate Advanced Career Report"}
          </button>

          {error ? <p className="error-text">{error}</p> : null}
        </form>

        <div className="panel output-panel">
          <div className="panel-heading">
            <h2>Coach Output</h2>
            <p>Personalized recommendations and placement preparation insights.</p>
          </div>
        <div className="dashboard-column">
          <div className="panel output-panel">
            <div className="panel-heading">
              <h2>Advanced Coach Dashboard</h2>
              <p>Role fit, resume quality, hiring trends, compensation, and actionable next steps.</p>
            </div>

          {result ? (
            <div className="results-grid">
              <article className="stat-card">
                <p className="mini-label">ATS Score</p>
                <strong>{result.resumeAnalysis.ats_score}%</strong>
              </article>
              <article className="stat-card">
                <p className="mini-label">Best-Fit Career</p>
                <strong>{result.skillGap.targetRole}</strong>
              </article>
              <article className="insight-card full-width">
                <p className="mini-label">Career Summary</p>
                <p>{result.careerSummary}</p>
              </article>
              <article className="insight-card">
                <h3>Recommended Roles</h3>
                <ul>
                  {result.recommendedRoles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </article>
              <article className="insight-card">
                <h3>Missing Skills</h3>
                <ul>
                  {result.skillGap.missingSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
              <article className="insight-card">
                <h3>Resume Feedback</h3>
                <ul>
                  {result.resumeAnalysis.feedback.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="insight-card">
                <h3>4-Month Roadmap</h3>
                <ul>
                  {result.roadmap.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              </article>
              <article className="insight-card full-width">
                <h3>Interview Questions</h3>
                <div className="question-columns">
                  <div>
                    <p className="mini-label">Technical</p>
                    <ul>
                      {result.interviewQuestions.technical.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mini-label">Coding</p>
                    <ul>
                      {result.interviewQuestions.coding.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
            {result ? (
              <div className="results-grid advanced-grid">
                <article className="stat-card glow-card">
                  <p className="mini-label">ATS Score</p>
                  <strong>{result.resumeAnalysis.ats_score}%</strong>
                </article>
                <article className="stat-card">
                  <p className="mini-label">Readiness</p>
                  <strong>{result.readinessMeter.score}%</strong>
                  <span>{result.readinessMeter.level} placement readiness</span>
                </article>
                <article className="stat-card">
                  <p className="mini-label">Best-Fit Role</p>
                  <strong>{result.skillGap.targetRole}</strong>
                </article>
                <article className="stat-card">
                  <p className="mini-label">Predicted Salary</p>
                  <strong>{result.salaryEstimate.predictedLpa} LPA</strong>
                  <span>{result.salaryEstimate.rangeLpa}</span>
                </article>

                <article className="insight-card full-width">
                  <p className="mini-label">Career Summary</p>
                  <p>{result.careerSummary}</p>
                </article>

                <article className="insight-card">
                  <h3>Recommended Roles</h3>
                  <ul>
                    {result.recommendedRoles.map((role) => (
                      <li key={role}>{role}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card">
                  <h3>Missing Skills</h3>
                  <ul>
                    {result.skillGap.missingSkills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card">
                  <h3>Resume Strengths</h3>
                  <ul>
                    {result.resumeAnalysis.strengths.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card">
                  <h3>Resume Fixes</h3>
                  <ul>
                    {result.resumeAnalysis.feedback.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card">
                  <h3>4-Month Roadmap</h3>
                  <ul>
                    {result.roadmap.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card">
                  <h3>4-Week Action Plan</h3>
                  <ul>
                    {result.weeklyPlan.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card full-width">
                  <h3>Job Trends and Tools</h3>
                  <div className="trend-grid">
                    {result.jobTrends.map((trend) => (
                      <div className="trend-card" key={trend.role}>
                        <p className="mini-label">{trend.role}</p>
                        <strong>{trend.growthIndex}/100 Growth Index</strong>
                        <p>{trend.hiringSignal}</p>
                        <p className="tag-row">{trend.topDomains.join(" | ")}</p>
                        <p className="tag-row">{trend.mustUseTools.join(" | ")}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="mini-label">HR</p>
                    <ul>
                      {result.interviewQuestions.hr.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ul>
                </article>

                <article className="insight-card">
                  <h3>LinkedIn Profile Audit</h3>
                  <p className="mini-label">Profile score {result.linkedinAnalysis.profileScore}%</p>
                  <p>{result.linkedinAnalysis.headline}</p>
                  <ul>
                    {result.linkedinAnalysis.suggestions.map((suggestion) => (
                      <li key={suggestion}>{suggestion}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card">
                  <h3>Project Recommendations</h3>
                  <ul>
                    {result.projectRecommendations.map((project) => (
                      <li key={project}>{project}</li>
                    ))}
                  </ul>
                </article>

                <article className="insight-card full-width">
                  <h3>Interview Questions</h3>
                  <div className="question-columns">
                    <div>
                      <p className="mini-label">Technical</p>
                      <ul>
                        {result.interviewQuestions.technical.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mini-label">Coding</p>
                      <ul>
                        {result.interviewQuestions.coding.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mini-label">HR</p>
                      <ul>
                        {result.interviewQuestions.hr.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ) : (
            <div className="empty-state">
              <p className="mini-label">Demo-ready output</p>
              <h3>Run the analysis to unlock the student dashboard.</h3>
              <p>
                You will see ATS score, career role suggestions, skill gap analysis, roadmap,
                and interview question sets here.
              </p>
                </article>
              </div>
            ) : (
              <div className="empty-state">
                <p className="mini-label">Advanced output</p>
                <h3>Generate the report to unlock the complete AI mentor dashboard.</h3>
                <p>
                  ATS score, readiness meter, salary estimate, trend insights, LinkedIn audit,
                  projects, and interview questions will appear here.
                </p>
              </div>
            )}
          </div>

          <form className="panel interview-panel" onSubmit={handleInterviewSubmit}>
            <div className="panel-heading">
              <h2>AI Mock Interview</h2>
              <p>Choose a role, paste an answer, and get instant scoring with feedback.</p>
            </div>
          )}

            <label>
              Target role
              <select name="role" value={interviewForm.role} onChange={handleInterviewChange}>
                {["Software Engineer", "Data Analyst", "Data Scientist", "AI Engineer"].map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Your answer
              <textarea
                name="answer"
                value={interviewForm.answer}
                onChange={handleInterviewChange}
                rows="5"
                placeholder="Paste your answer to a mock interview question"
              />
            </label>

            <button className="secondary-button" type="submit" disabled={isInterviewLoading}>
              {isInterviewLoading ? "Reviewing answer..." : "Review Mock Interview Answer"}
            </button>

            {interviewError ? <p className="error-text">{interviewError}</p> : null}

            {interviewResult ? (
              <div className="mock-result">
                <div className="mock-score">
                  <p className="mini-label">Interview Score</p>
                  <strong>{interviewResult.answerReview.score}%</strong>
                </div>
                <div className="question-list">
                  <p className="mini-label">Suggested Questions</p>
                  <ul>
                    {interviewResult.questions.map((question) => (
                      <li key={question}>{question}</li>
                    ))}
                  </ul>
                </div>
                <div className="question-list">
                  <p className="mini-label">Answer Feedback</p>
                  <ul>
                    {interviewResult.answerReview.feedback.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </form>
        </div>
      </section>
    </div>

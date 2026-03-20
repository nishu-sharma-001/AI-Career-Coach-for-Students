
from flask import Flask, jsonify, request
from flask_cors import CORS

from analyzer import generate_result
from analyzer import generate_mock_interview, generate_result

app = Flask(__name__)
CORS(app)
    return jsonify(result)


@app.post("/api/mock-interview")
def mock_interview():
    payload = request.get_json(silent=True) or {}
    result = generate_mock_interview(payload)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5000)

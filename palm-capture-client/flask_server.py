from flask import Flask, jsonify, request
from flask_cors import CORS
import palm_capture

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.route("/capture", methods=["GET"])
def capture():
    voter_code = request.args.get("voterCode")
    hand = request.args.get("hand")

    if not voter_code:
        return jsonify({"status": "error", "message": "voterCode required"}), 400
    if hand not in ["left", "right"]:
        return jsonify({"status": "error", "message": "hand must be left/right"}), 400

    try:
        template_bytes = palm_capture.register_palm(voter_code, hand, send_to_backend=False)
        if template_bytes is None:
            return jsonify({"status": "cancelled"}), 400

        import base64
        template_b64 = base64.b64encode(template_bytes).decode()

        return jsonify({
            "status": "success",
            "template": template_b64,
            "voterCode": voter_code
        })

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)

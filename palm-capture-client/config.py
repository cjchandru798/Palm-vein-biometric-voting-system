# config.py
BACKEND_URL = "http://localhost:8080"

QKD_SESSION_URL = f"{BACKEND_URL}/api/security/qkd/session-key"

ADMIN_REGISTER_TEMPLATE_URL = (
    f"{BACKEND_URL}/api/admin/voters/{{voter_code}}/register-template"
)

VOTER_SCAN_URL = f"{BACKEND_URL}/api/voter/scan"

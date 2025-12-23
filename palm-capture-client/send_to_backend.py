import requests
from encryptor import aes_gcm_encrypt
from qkd_session import get_session_key
from config import ADMIN_REGISTER_TEMPLATE_URL, VOTER_SCAN_URL

def send_template(voter_code, template_bytes, admin_mode=False):
    session_key = get_session_key()

    encrypted_template = aes_gcm_encrypt(template_bytes, session_key)

    payload = {
        "voterCode": voter_code,
        "encryptedTemplate": encrypted_template
    }

    if admin_mode:
        url = ADMIN_REGISTER_TEMPLATE_URL.format(voter_code=voter_code)
        payload["sessionKey"] = session_key
    else:
        url = VOTER_SCAN_URL

    print(f"\n📤 POST → {url}")
    print(f"Payload bytes: {len(str(payload))}")

    try:
        res = requests.post(url, json=payload, timeout=30)
        res.raise_for_status()
        print("✔ Response:", res.status_code, res.text)
        return res
    except requests.HTTPError as e:
        print(f"❌ HTTP Error: {e.response.status_code} - {e.response.text}")
    except Exception as e:
        print(f"❌ Request failed:", e)

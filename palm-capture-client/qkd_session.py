# qkd_session.py
import requests
from config import QKD_SESSION_URL

def get_session_key():
    res = requests.get(QKD_SESSION_URL)
    if res.status_code != 200:
        raise Exception("❌ Failed to obtain QKD key")
    return res.text.strip()

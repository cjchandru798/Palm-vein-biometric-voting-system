import cv2
import requests
from preprocess import create_template
from encryptor import aes_gcm_encrypt
from qkd_session import get_session_key
from config import VOTER_SCAN_URL

def capture_palm_image():
    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        print("❌ Cannot access webcam")
        return None

    print("Press 'c' to capture palm…")
    frame = None

    while True:
        ret, frm = cam.read()
        cv2.imshow("Palm Verification", frm)

        if cv2.waitKey(1) & 0xFF == ord('c'):
            frame = frm
            cv2.imwrite("verify.jpg", frame)
            print("📸 Captured")
            break

    cam.release()
    cv2.destroyAllWindows()
    return "verify.jpg"

def verify_palm(voter_code):
    img_path = capture_palm_image()
    if img_path is None:
        return

    template_bytes = create_template(img_path)
    session_key = get_session_key()

    encrypted_template = aes_gcm_encrypt(template_bytes, session_key)

    payload = {
        "voterCode": voter_code,
        "encryptedTemplate": encrypted_template
    }

    print("➡ Sending to backend...")
    res = requests.post(VOTER_SCAN_URL, json=payload)
    print("⬅ Response:", res.status_code, res.text)


if __name__ == "__main__":
    verify_palm(input("Enter voter code: "))

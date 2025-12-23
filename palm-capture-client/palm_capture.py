import cv2
import base64
import os
from preprocess import create_template

TEMPLATE_FOLDER = "templates"
os.makedirs(TEMPLATE_FOLDER, exist_ok=True)

def capture_palm(hand: str, voter_code: str) -> str:
    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        raise Exception("Camera not detected")

    print(f"Press 'c' to capture {hand} palm for {voter_code}")
    img_path = f"{hand}_{voter_code}.jpg"

    while True:
        ret, frame = cam.read()
        if not ret:
            raise Exception("Camera read failed")

        cv2.imshow("Palm Capture", frame)
        key = cv2.waitKey(1) & 0xFF

        if key == ord('c'):
            cv2.imwrite(img_path, frame)
            break
        elif key == ord('q'):
            cam.release()
            cv2.destroyAllWindows()
            return None

    cam.release()
    cv2.destroyAllWindows()
    return img_path


def register_palm(voter_code: str, hand: str, send_to_backend=False):
    img_path = capture_palm(hand, voter_code)
    if img_path is None:
        return None

    template_bytes = create_template(img_path)
    return template_bytes

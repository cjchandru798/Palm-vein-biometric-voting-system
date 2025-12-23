import cv2
import base64
import os
from preprocess import create_template
from send_to_backend import send_template

TEMPLATE_FOLDER = "templates"
os.makedirs(TEMPLATE_FOLDER, exist_ok=True)

def register_palm(voter_code, hand):
    cam = cv2.VideoCapture(0)
    if not cam.isOpened():
        raise Exception("❌ Camera not detected")

    print(f"📸 Press 'c' to capture {hand} palm...")
    img_path = f"{hand}_{voter_code}.jpg"

    while True:
        ret, frame = cam.read()
        if not ret:
            cam.release()
            cv2.destroyAllWindows()
            raise Exception("❌ Camera read failure")

        cv2.imshow(f"{hand} Palm Registration", frame)

        key = cv2.waitKey(1) & 0xFF
        if key == ord('c'):
            cv2.imwrite(img_path, frame)
            print(f"✔ Image saved: {img_path}")
            break
        if key == ord('q'):
            cam.release()
            cv2.destroyAllWindows()
            print("⚠ Cancelled.")
            return None

    cam.release()
    cv2.destroyAllWindows()

    template_bytes = create_template(img_path)

    print(f"✔ Template created: {len(template_bytes)} bytes")

    send_template(voter_code, template_bytes, admin_mode=True)

    template_b64 = base64.b64encode(template_bytes).decode()
    path = os.path.join(TEMPLATE_FOLDER, f"{hand}_{voter_code}.b64")

    with open(path, "w") as f:
        f.write(template_b64)

    print(f"📂 Saved Base64 template → {path}")
    print("🎯 Registration complete.")

    return template_bytes

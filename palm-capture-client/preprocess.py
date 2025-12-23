import cv2
import numpy as np

def create_template(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        raise Exception("❌ Could not load image")

    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
    img = clahe.apply(img)

    img = cv2.GaussianBlur(img, (5, 5), 0)

    img = cv2.adaptiveThreshold(
        img, 255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY_INV, 11, 2
    )

    img = cv2.resize(img, (128, 128))
    flat = img.flatten().astype(np.uint8)

    return flat.tobytes()

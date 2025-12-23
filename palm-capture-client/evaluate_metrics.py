# evaluate_metrics.py
import base64
import numpy as np
import csv
from math import isclose
from sklearn.metrics import roc_curve, auc

def load_template_b64(path):
    with open(path, "r") as f:
        b64 = f.read().strip()
    return base64.b64decode(b64)

def similarity(a: bytes, b: bytes):
    # ensure same length by truncation / pad with zeros
    la, lb = len(a), len(b)
    n = min(la, lb)
    if n == 0: return 0.0
    s = 0.0
    for i in range(n):
        s += abs((a[i] & 0xFF) - (b[i] & 0xFF))
    avg = s / n
    sim = 1.0 - (avg / 255.0)
    if sim < 0: sim = 0.0
    return sim

def load_pairs(csv_path):
    probes, galleries, labels = [], [], []
    with open(csv_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            probes.append(row['probe_path'])
            galleries.append(row['gallery_path'])
            labels.append(int(row['label']))
    return probes, galleries, labels

def main():
    probes, galleries, labels = load_pairs("pairs.csv")
    scores = []
    for p,g in zip(probes, galleries):
        pa = load_template_b64(p)
        ga = load_template_b64(g)
        s = similarity(pa, ga)
        scores.append(s)

    # Compute ROC / EER / AUC
    fpr, tpr, thresholds = roc_curve(labels, scores)
    roc_auc = auc(fpr, tpr)

    # compute EER (where FAR == FRR)
    fnr = 1 - tpr
    eer_idx = (np.abs(fnr - fpr)).argmin()
    eer = (fpr[eer_idx] + fnr[eer_idx]) / 2

    print("AUC:", roc_auc)
    print("EER:", eer)
    # Optional: print threshold operating points
    for i in range(0, len(thresholds), max(1, len(thresholds)//10)):
        print(f"th={thresholds[i]:.3f} fpr={fpr[i]:.3f} tpr={tpr[i]:.3f}")

if __name__ == "__main__":
    main()

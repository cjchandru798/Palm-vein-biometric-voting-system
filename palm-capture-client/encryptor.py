import base64
import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes

def aes_gcm_encrypt(data_bytes, base64_key):
    """
    Encrypt using AES-GCM to match backend AESUtil.decryptGCMBase64()
    Output format = Base64( IV + ciphertext + tag )
    """
    key = base64.b64decode(base64_key)
    iv = os.urandom(12)  # 96-bit IV (GCM standard)

    cipher = Cipher(algorithms.AES(key), modes.GCM(iv))
    encryptor = cipher.encryptor()

    ciphertext = encryptor.update(data_bytes) + encryptor.finalize()

    final_bytes = iv + ciphertext + encryptor.tag
    return base64.b64encode(final_bytes).decode()

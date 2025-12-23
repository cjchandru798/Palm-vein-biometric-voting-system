package com.quantum.voting.utils;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

public class AESUtil {

    private static final int AES_KEY_SIZE = 256;        // bits
    private static final int GCM_TAG_LENGTH = 128;      // bits
    private static final int GCM_NONCE_LENGTH = 12;     // bytes (96-bit recommended)

    /**
     * Generate a new AES-256 key (for prototype)
     */
    public static SecretKey generateKey() throws Exception {
        KeyGenerator keyGen = KeyGenerator.getInstance("AES");
        keyGen.init(AES_KEY_SIZE);
        return keyGen.generateKey();
    }

    /**
     * Convert Base64 encoded string key → bytes
     */
    public static byte[] base64ToKeyBytes(String base64Key) {
        return Base64.getDecoder().decode(base64Key);
    }

    /**
     * Convert AES SecretKey → Base64 string
     */
    public static String keyToBase64(SecretKey key) {
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }

    /**
     * Random 256-bit session key (if not using QKD)
     */
    public static byte[] generateSessionKeyBytes() {
        byte[] bytes = new byte[32]; // 256-bit
        new SecureRandom().nextBytes(bytes);
        return bytes;
    }

    /**
     * AES-GCM encryption for palm templates
     * Output: Base64( nonce || ciphertext )
     */
    public static String encryptGCM(byte[] data, byte[] keyBytes) throws Exception {
        byte[] nonce = new byte[GCM_NONCE_LENGTH];
        new SecureRandom().nextBytes(nonce);

        SecretKey key = new SecretKeySpec(keyBytes, "AES");
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, nonce);
        cipher.init(Cipher.ENCRYPT_MODE, key, spec);

        byte[] encrypted = cipher.doFinal(data);

        // combine (nonce || ciphertext)
        byte[] combined = new byte[nonce.length + encrypted.length];
        System.arraycopy(nonce, 0, combined, 0, nonce.length);
        System.arraycopy(encrypted, 0, combined, nonce.length, encrypted.length);

        return Base64.getEncoder().encodeToString(combined);
    }

    /**
     * AES-GCM decryption for palm templates
     * Accepts Base64( nonce || ciphertext )
     */
    public static byte[] decryptGCMBase64(String encryptedBase64, byte[] keyBytes) throws Exception {
        byte[] combined = Base64.getDecoder().decode(encryptedBase64);

        if (combined.length < GCM_NONCE_LENGTH) {
            throw new IllegalArgumentException("Invalid encrypted template");
        }

        byte[] nonce = new byte[GCM_NONCE_LENGTH];
        byte[] cipherBytes = new byte[combined.length - GCM_NONCE_LENGTH];

        System.arraycopy(combined, 0, nonce, 0, GCM_NONCE_LENGTH);
        System.arraycopy(combined, GCM_NONCE_LENGTH, cipherBytes, 0, cipherBytes.length);

        SecretKey key = new SecretKeySpec(keyBytes, "AES");
        Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec spec = new GCMParameterSpec(GCM_TAG_LENGTH, nonce);
        cipher.init(Cipher.DECRYPT_MODE, key, spec);

        return cipher.doFinal(cipherBytes);
    }
}

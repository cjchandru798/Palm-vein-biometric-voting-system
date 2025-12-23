package com.quantum.voting.service;

import com.quantum.voting.utils.AESUtil;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;

@Service
public class QKDService {

    public String generateSessionKey() throws Exception {
        SecretKey key = AESUtil.generateKey();
        return Base64.getEncoder().encodeToString(key.getEncoded());
    }
}

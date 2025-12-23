package com.quantum.voting.DTO;

import lombok.Data;

@Data
public class ScanRequest {
    private String voterCode;
    private String encryptedTemplate;
}

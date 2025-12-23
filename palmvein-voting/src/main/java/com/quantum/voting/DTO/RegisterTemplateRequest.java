package com.quantum.voting.DTO;

import lombok.Data;

@Data
public class RegisterTemplateRequest {
    private String leftTemplate;
    private String rightTemplate;
    private String sessionKey;
}
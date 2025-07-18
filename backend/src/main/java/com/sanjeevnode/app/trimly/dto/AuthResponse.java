package com.sanjeevnode.app.trimly.dto;

public record AuthResponse(
        String username,
        String role,
        String token
) {
}

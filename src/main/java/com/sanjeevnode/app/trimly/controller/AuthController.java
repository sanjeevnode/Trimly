package com.sanjeevnode.app.trimly.controller;

import com.sanjeevnode.app.trimly.dto.UserRequestDTO;
import com.sanjeevnode.app.trimly.service.AuthService;
import com.sanjeevnode.app.trimly.utils.ApiResponse;
import com.sanjeevnode.app.trimly.utils.AppLogger;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@Tag(name = "User Authentication")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final AppLogger logger = new AppLogger(AuthController.class, "AuthController");

    @GetMapping("/health")
    public String healthCheck() {
        logger.info("Health check endpoint hit");
        return "Auth Service is running";
    }

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody UserRequestDTO registerUserDTO) {
        logger.info("Register endpoint hit");
        return authService.register(registerUserDTO).buildResponse();
    }

    @PostMapping("/login")
    @Operation(summary = "Login a user")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody UserRequestDTO loginUserDTO) {
        logger.info("Login endpoint hit");
        return authService.login(loginUserDTO).buildResponse();
    }

    @GetMapping("/user")
    @Operation(summary = "Get user details")
    public ResponseEntity<ApiResponse> getUserDetails(@RequestParam String username) {
        logger.info("Get user details endpoint hit");
        return authService.getUserDetails(username).buildResponse();
    }

    @PostMapping("/validate")
    @Operation(summary = "Validate JWT token")
    public ResponseEntity<ApiResponse> validateToken(@RequestParam String token) {
        logger.info("Validate token endpoint hit");
        return authService.validateToken(token).buildResponse();
    }
}

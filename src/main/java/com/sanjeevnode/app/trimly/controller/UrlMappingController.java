package com.sanjeevnode.app.trimly.controller;

import com.sanjeevnode.app.trimly.dto.UrlRequestDTO;
import com.sanjeevnode.app.trimly.service.UrlMappingService;
import com.sanjeevnode.app.trimly.utils.ApiResponse;
import com.sanjeevnode.app.trimly.utils.AppLogger;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.security.Principal;

@RestController
@Tag(name = "URL Shortening")
@AllArgsConstructor
public class UrlMappingController {

    private final UrlMappingService urlService;

    private final AppLogger logger = new AppLogger(AuthController.class, "UrlMappingController");

    /**
     * Endpoint to shorten a URL.
     *
     * @param request the URL request containing the original URL and user ID
     * @return ResponseEntity with ApiResponse containing the shortened URL
     */
    @PostMapping("/api/trim")
    @Operation(summary = "Trim a URL")
    public ResponseEntity<ApiResponse> shortenUrl(@Valid @RequestBody UrlRequestDTO request) {
        logger.info("Trim URL endpoint hit with request: " + request);
        return urlService.shortenUrl(request).buildResponse();
    }

    @GetMapping("/{shortUrl}")
    @Operation(summary = "Redirect to original URL")
    public RedirectView redirectToOriginalUrl(@PathVariable String shortUrl) {
        logger.info("Redirect request received for shortCode: " + shortUrl);
        return new RedirectView(urlService.getOriginalUrl(shortUrl));
    }

    @GetMapping("/api/list-urls")
    @Operation(summary = "List all URLs for the logged-in user")
    public ResponseEntity<ApiResponse> listUrls(Principal principal) {
        logger.info("List URLs endpoint hit for user: " + principal.getName());
        return urlService.getUrlByUser().buildResponse();
    }

}

package com.sanjeevnode.app.trimly.service;

import com.sanjeevnode.app.trimly.controller.AuthController;
import com.sanjeevnode.app.trimly.dto.UrlRequestDTO;
import com.sanjeevnode.app.trimly.exception.UrlNotFoundException;
import com.sanjeevnode.app.trimly.exception.UrlRedirectException;
import com.sanjeevnode.app.trimly.model.UrlMapping;
import com.sanjeevnode.app.trimly.repository.UrlMappingRepository;
import com.sanjeevnode.app.trimly.utils.ApiResponse;
import com.sanjeevnode.app.trimly.utils.AppLogger;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class UrlMappingService {


    private final UserService userService;

    private final UrlMappingRepository urlMappingRepository;

    private final AppLogger logger = new AppLogger(AuthController.class, "UrlMappingService");

    public ApiResponse shortenUrl(UrlRequestDTO request) {
        var user = userService.getLoggedInUser();
        String shortCode = generateShortCode();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(request.getOriginalUrl());
        urlMapping.setShortUrl(shortCode);
        urlMapping.setUserId(user.getId());
        urlMappingRepository.save(urlMapping);
        logger.info("Url shortened: " + urlMapping);
        return ApiResponse.builder()
                .status(HttpStatus.CREATED)
                .message("URL shortened successfully")
                .data(urlMapping)
                .build();
    }


    public String generateShortCode() {
        long seconds = System.currentTimeMillis() / 1000;
        return encodeBase62(seconds);
    }

    private String encodeBase62(long value) {
        StringBuilder sb = new StringBuilder();
        String BASE62 = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        while (value > 0) {
            int index = (int) (value % 62);
            sb.insert(0, BASE62.charAt(index));
            value /= 62;
        }
        return sb.toString();
    }

    public String getOriginalUrl(String shortUrl) {
        var urlMapping = urlMappingRepository.findByShortUrl(shortUrl)
                .orElseThrow(() -> new UrlRedirectException(shortUrl));
        logger.info("Original URL retrieved: " + urlMapping.getOriginalUrl());
        urlMapping.setClickCount(urlMapping.getClickCount()+1);
        return urlMapping.getOriginalUrl();
    }
}

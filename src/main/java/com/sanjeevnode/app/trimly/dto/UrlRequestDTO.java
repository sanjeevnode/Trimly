package com.sanjeevnode.app.trimly.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlRequestDTO {

    @NotBlank(message = "Original URL is required")
    @Schema(example = "https://www.example.com/some/long/url")
    private String originalUrl;
}

package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.constants.UrlConst;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(UrlConst.API_BASE_URL + "/**")
                .allowedOrigins(UrlConst.CORS_ORIGIN)
                .allowedMethods(UrlConst.CORS_ALLOWED_METHODS.split(",\\s*"))
                .allowedHeaders(UrlConst.CORS_ALLOWED_HEADERS.split(",\\s*"))
                .exposedHeaders(UrlConst.CORS_EXPOSED_HEADERS)
                .allowCredentials(Boolean.parseBoolean(UrlConst.CORS_ALLOWED_CREDENTIALS))
                .maxAge(Long.parseLong(UrlConst.CORS_MAX_AGE));
    }
}

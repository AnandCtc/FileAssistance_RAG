package com.example.ragassistant.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping
    public ResponseEntity<Map<String, String>> getApiStatus() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "RAG Assistant API is running"
        ));
    }

    @GetMapping("/test")
    public ResponseEntity<Map<String, String>> getTestApi() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Test API endpoint is working"
        ));
    }
}

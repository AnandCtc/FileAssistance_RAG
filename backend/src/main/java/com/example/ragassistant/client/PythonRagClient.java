package com.example.ragassistant.client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class PythonRagClient {

    @Autowired
    private RestTemplate restTemplate;

    private final String PYTHON_API =
            "http://localhost:8000";

    public void processDocument(
            String filePath
    ) {
System.out.println("STEP 4: Calling Python API");
        String url =
                PYTHON_API + "/api/process";

        Map<String, String> request =
                Map.of(
                        "filePath",
                        filePath
                );

        restTemplate.postForObject(
                url,
                request,
                String.class
        );
    }

    public String askQuestion(
            String question
    ) {
System.out.println("STEP 12: Calling /api/chat");
        String url =
                PYTHON_API + "/api/chat";

        Map<String, String> request =
                Map.of(
                        "question",
                        question
                );

        Map response =
                restTemplate.postForObject(
                        url,
                        request,
                        Map.class
                );

        return response.get("answer")
                .toString();
    }
}
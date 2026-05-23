package com.example.ragassistant.service;

import com.example.ragassistant.client.PythonRagClient;
import com.example.ragassistant.entity.QAPair;
import com.example.ragassistant.repository.QAPairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class QueryService {

    @Autowired
    private PythonRagClient pythonRagClient;

    @Autowired
    private QAPairRepository qaPairRepository;

    public String askQuestion(
            String question
    ) {
        System.out.println("STEP 11: Sending question to Python");
        String answer = pythonRagClient.askQuestion(question);

        // persist QA pair
        try {
            QAPair pair = new QAPair(question, answer, LocalDateTime.now());
            qaPairRepository.save(pair);
        } catch (Exception e) {
            System.err.println("Failed to save QA pair: " + e.getMessage());
        }

        return answer;
    }
}
package com.example.ragassistant.service;

import com.example.ragassistant.client.PythonRagClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.file.Path;

@Service
public class FileProcessingService {

    @Autowired
    private PythonRagClient pythonRagClient;

    public String processFile(Path path) {
        System.out.println("STEP 3: Sending file to Python RAG");
        try {

            // CALL PYTHON RAG SERVICE

            pythonRagClient.processDocument(
                    path.toAbsolutePath().toString()
            );

            return String.format(
                    "File processed successfully: %s",
                    path.toAbsolutePath()
            );

        } catch (Exception exception) {

            exception.printStackTrace();

            throw new RuntimeException(
                    "Failed to process file using Python RAG service"
            );
        }
    }
}

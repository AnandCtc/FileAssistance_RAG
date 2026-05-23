package com.example.ragassistant.service;

import com.example.ragassistant.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileValidationService {

    private static final long MAX_FILE_SIZE = 30L * 1024 * 1024;

    public void validateFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new CustomException("File must not be empty", HttpStatus.BAD_REQUEST);
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new CustomException("File exceeds maximum allowed size of 30MB", HttpStatus.BAD_REQUEST);
        }
    }
}

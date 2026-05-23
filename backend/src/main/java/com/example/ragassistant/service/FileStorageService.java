package com.example.ragassistant.service;

import com.example.ragassistant.exception.CustomException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorageService {

    private final Path uploadDir;

    public FileStorageService(@Value("${file.upload-dir:uploaded_files}") String uploadDir) {
        this.uploadDir = Paths.get(uploadDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.uploadDir);
        } catch (IOException ex) {
            System.err.println("Error creating upload directory: " + ex.getMessage());
            throw new CustomException("Could not create upload directory", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public Path storeFile(MultipartFile file) {
        try {
            System.out.println("STEP 2: Saving file locally");
            String filename = Path.of(file.getOriginalFilename()).getFileName().toString();
            Path targetLocation = this.uploadDir.resolve(filename);
            System.out.println("Storing file: " + filename + " at " + targetLocation.toAbsolutePath());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File stored successfully: " + targetLocation.toAbsolutePath());
            return targetLocation;
        } catch (IOException ex) {
            System.err.println("Error storing file: " + ex.getMessage());
            ex.printStackTrace();
            throw new CustomException("Failed to store file: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            System.err.println("Unexpected error storing file: " + ex.getMessage());
            ex.printStackTrace();
            throw new CustomException("Unexpected error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

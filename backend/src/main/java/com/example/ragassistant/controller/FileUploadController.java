package com.example.ragassistant.controller;

import com.example.ragassistant.dto.UploadResponse;
import com.example.ragassistant.entity.UploadedFile;
import com.example.ragassistant.repository.UploadedFileRepository;
import com.example.ragassistant.service.FileProcessingService;
import com.example.ragassistant.service.FileStorageService;
import com.example.ragassistant.service.FileValidationService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private final FileValidationService validationService;
    private final FileStorageService storageService;
    private final FileProcessingService processingService;
    private final UploadedFileRepository uploadedFileRepository;

    public FileUploadController(FileValidationService validationService,
                                FileStorageService storageService,
                                FileProcessingService processingService,
                                UploadedFileRepository uploadedFileRepository) {
        this.validationService = validationService;
        this.storageService = storageService;
        this.processingService = processingService;
        this.uploadedFileRepository = uploadedFileRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadFile(@RequestParam("file") MultipartFile file) {
        System.out.println("STEP 1: File received from frontend");
        System.out.println("Received file upload request: " + file.getOriginalFilename() + " (" + file.getSize() + " bytes)");
        validationService.validateFile(file);
        Path storedFile = storageService.storeFile(file);
        System.out.println("File stored at: " + storedFile.toAbsolutePath());
        processingService.processFile(storedFile);

        UploadedFile uploadedFile = new UploadedFile(
                file.getOriginalFilename(),
                file.getContentType(),
                file.getSize(),
                LocalDateTime.now()
        );
        uploadedFileRepository.save(uploadedFile);

        UploadResponse response = new UploadResponse(file.getOriginalFilename(), "Upload successful");
        System.out.println("Upload response: " + response.getMessage() + " for file: " + response.getFileName());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping
    public ResponseEntity<List<UploadedFile>> getUploadedFiles() {
        List<UploadedFile> uploadedFiles = uploadedFileRepository.findAll();
        return ResponseEntity.ok(uploadedFiles);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFile(@PathVariable Long id) {
        System.out.println("Deleting file with id: " + id);
        uploadedFileRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllFiles() {
        System.out.println("Deleting all files");
        uploadedFileRepository.deleteAll();
        return ResponseEntity.ok().build();
    }
}

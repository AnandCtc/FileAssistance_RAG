package com.example.ragassistant.exception;

import com.example.ragassistant.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException exception) {
        ErrorResponse response = new ErrorResponse(exception.getMessage(), exception.getStatus().value());
        System.out.println("Custom exception occurred: " + exception.getMessage() + " with status: " + exception.getStatus());
        return ResponseEntity.status(exception.getStatus()).body(response);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceeded(MaxUploadSizeExceededException exception) {
        ErrorResponse response = new ErrorResponse("File exceeds maximum upload size of 30MB", HttpStatus.PAYLOAD_TOO_LARGE.value());
        System.out.println("Max upload size exceeded: " + exception.getMessage());
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneralException(Exception exception) {
        ErrorResponse response = new ErrorResponse("An unexpected error occurred", 500);
        System.out.println("Unexpected error occurred: " + exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.status(500).body(response);
    }
}

package com.example.ragassistant.exception;

import org.springframework.http.HttpStatus;

public class CustomException extends RuntimeException {

    private final HttpStatus status;

    public CustomException(
            String message,
            HttpStatus status
    ) {
        super(message);
        this.status = status;
    }

    // Optional constructor
    public CustomException(String message) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
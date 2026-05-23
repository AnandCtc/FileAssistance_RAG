package com.example.ragassistant.dto;

public class ErrorResponse {

    private String message;

    private int status;

    // Default constructor
    public ErrorResponse() {

    }

    // Constructor with message only
    public ErrorResponse(String message) {

        this.message = message;
    }

    // Constructor with message + status
    public ErrorResponse(
            String message,
            int status
    ) {

        this.message = message;

        this.status = status;
    }

    // GETTERS

    public String getMessage() {

        return message;
    }

    public int getStatus() {

        return status;
    }

    // SETTERS

    public void setMessage(String message) {

        this.message = message;
    }

    public void setStatus(int status) {

        this.status = status;
    }
}
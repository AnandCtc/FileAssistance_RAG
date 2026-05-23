package com.example.ragassistant.dto;

public class QueryResponse {

    private String answer;

    public QueryResponse(
            String answer
    ) {
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }
}
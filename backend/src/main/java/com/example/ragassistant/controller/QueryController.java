package com.example.ragassistant.controller;

import com.example.ragassistant.dto.QueryRequest;
import com.example.ragassistant.dto.QueryResponse;
import com.example.ragassistant.service.QueryService;
import com.example.ragassistant.dto.QAPairDto;
import com.example.ragassistant.repository.QAPairRepository;
import com.example.ragassistant.entity.QAPair;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/query")
@CrossOrigin("*")
public class QueryController {

    @Autowired
    private QueryService queryService;

        @Autowired
        private QAPairRepository qaPairRepository;

    @PostMapping
    public QueryResponse askQuestion(
            @RequestBody QueryRequest request
    ) {
System.out.println("STEP 10: Question received");
        String answer =
                queryService.askQuestion(
                        request.getQuestion()
                );

        return new QueryResponse(answer);
    }

        @GetMapping("/history")
        public java.util.List<QAPairDto> getHistory() {
                java.util.List<QAPair> pairs = qaPairRepository.findAllByOrderByCreatedAtDesc();
                java.util.List<QAPairDto> dtos = new java.util.ArrayList<>();
                for (QAPair p : pairs) {
                        dtos.add(new QAPairDto(p.getId(), p.getQuestion(), p.getAnswer(), p.getCreatedAt()));
                }
                return dtos;
        }
}
package com.noop.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * AI控制器
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/24 23:15
 */
@Tag(name = "AiController", description = "Ai对接控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/ai")
@SecurityRequirement(name = "Bearer Authentication")
public class AiController {

//    @Operation(summary = "测试流式返回接口")
//    @GetMapping(value = "test", produces  = MediaType.TEXT_EVENT_STREAM_VALUE)
//    public Flux<String> test() {
//        return Flux<String>.
//    }

}

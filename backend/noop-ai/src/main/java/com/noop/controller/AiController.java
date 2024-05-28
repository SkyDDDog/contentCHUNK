package com.noop.controller;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.nacos.shaded.com.google.gson.JsonObject;
import com.noop.model.api.ChatModel;
import com.noop.model.api.Context;
import com.noop.model.dto.ChatDTO;
import com.noop.model.dto.ExpandDTO;
import com.noop.model.vo.ChatToolVO;
import com.noop.model.vo.ChatVO;
import com.noop.util.RedisUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Flux;
import reactor.netty.http.client.HttpClient;
import reactor.netty.transport.ProxyProvider;

import java.util.ArrayList;
import java.util.List;

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

    @Autowired
    private RedisUtil redisUtil;

    private final String CHAT_CACHE_KEY = "ai:chat";
    private final long CACHE_EXPIRE = 60 * 60 * 24 * 7;
    @Operation(summary = "聊天对话")
    @PostMapping(value = "chat/{id}", produces  = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ChatVO> chat(@PathVariable String id,@RequestBody ChatDTO dto) {
        StringBuilder sb = new StringBuilder();
        List<Context> history = (List<Context>) redisUtil.hget(CHAT_CACHE_KEY, id);
        if (history == null) {
            history = new ArrayList<>();
        }
        ChatModel req = new ChatModel();
        req.setHistory(history)
                .setInput(dto.getInput());
        List<Context> finalHistory = history;
        return webClient().post()
                .uri("/chat")
                .bodyValue(req)
                .exchangeToFlux(resp ->
                    resp.bodyToFlux(ChatVO.class)
                )
                .map(chatVO -> {
                    chatVO.setId(id);
                    sb.append(chatVO.getData());
                    return chatVO;
                })
                .doFinally(signalType -> {
                    log.info("signalType: {}", signalType);
                    if ("ON_ERROR".equals(signalType)) {
                        return;
                    }
                    Context ai = new Context();
                    ai.setRole("assistant")
                            .setContent(sb.toString());
                    Context user = new Context();
                    user.setRole("user")
                            .setContent(dto.getInput());
                    finalHistory.add(user);
                    finalHistory.add(ai);
                    log.info("finalHistory: {}", finalHistory);
                    redisUtil.hset(CHAT_CACHE_KEY, id, finalHistory, CACHE_EXPIRE);
                });
    }

    @Operation(summary = "扩写")
    @PostMapping(value = "expand", produces  = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ChatVO> expand(@RequestBody ExpandDTO dto) {
        return webClient().post()
                .uri("/expand?input=" + dto.getInput())
                .exchangeToFlux(resp ->
                        resp.bodyToFlux(ChatVO.class)
                );
    }

    @Operation(summary = "带有工具链的聊天对话(现支持web_search)")
    @PostMapping(value = "chat/tool/{id}", produces  = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ChatToolVO> chatWithTool(@PathVariable String id,@RequestBody ChatDTO dto) {
        StringBuilder sb = new StringBuilder();
        List<Context> history = (List<Context>) redisUtil.hget(CHAT_CACHE_KEY, id);
        if (history == null) {
            history = new ArrayList<>();
        }
        ChatModel req = new ChatModel();
        req.setHistory(history)
                .setInput(dto.getInput());
        log.info("req: {}", req);
        log.info("req json: {}", JSONObject.toJSONString(req));
        List<Context> finalHistory = history;
        return webClient().post()
                .uri("/chat_tools")
                .bodyValue(req)
                .exchangeToFlux(resp ->
                        resp.bodyToFlux(ChatToolVO.class)
                )
                .map(vo -> {
                    vo.setId(id);
                    if ("on_chat_model_stream".equals(vo.getStep())) {
                        sb.append(vo.getData());
                    }
                    return vo;
                })
                .doFinally(signalType -> {
                    log.info("signalType: {}", signalType);
                    if ("ON_ERROR".equals(signalType)) {
                        return;
                    }
                    Context ai = new Context();
                    ai.setRole("assistant")
                            .setContent(sb.toString());
                    Context user = new Context();
                    user.setRole("user")
                            .setContent(dto.getInput());
                    finalHistory.add(user);
                    finalHistory.add(ai);
                    log.info("finalHistory: {}", finalHistory);
                    redisUtil.hset(CHAT_CACHE_KEY, id, finalHistory, CACHE_EXPIRE);
                });
    }


    private WebClient webClient(){
        return  WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(
                        HttpClient.create()
                ))
                .defaultHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                .baseUrl("http://123.249.33.39:10086")
                .build();
    }


}

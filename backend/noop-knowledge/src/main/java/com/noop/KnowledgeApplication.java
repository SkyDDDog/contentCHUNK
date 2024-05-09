package com.noop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * 知识库模块主启动类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 17:43
 */
@SpringBootApplication
@EnableDiscoveryClient
public class KnowledgeApplication {
    public static void main(String[] args) {
        SpringApplication.run(KnowledgeApplication.class, args);
    }
}

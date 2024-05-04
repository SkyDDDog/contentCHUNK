package com.noop.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.security.SecuritySchemes;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;

/**
 * SpringDoc在线文档全局配置
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/21 17:13
 */

@OpenAPIDefinition(
        info = @Info(
                // 标题
                title = "${springdoc.api-docs.info.title}",
                // 版本
                version = "${springdoc.api-docs.info.version}",
                // 描述
                description = "${springdoc.api-docs.info.description}",
                // 首页
                termsOfService = "${springdoc.api-docs.info.termsOfService}"
                // license
//                license = @License(
//                        name = "${springdoc.api-docs.license.name}",
                          // license 地址
//                        url = "http://127.0.0.1:8080/example/test01"
//                )
        ),
//         这里的名字是引用下边 @SecurityScheme 注解中指定的名字，指定后发起请求时会在请求头中按照OAuth2的规范添加token
//        security = @SecurityRequirement(name = "${springdoc.api-docs.security.name}"),
        servers = @Server(url = "${springdoc.api-docs.info.gateway-url}")
)
@SecuritySchemes({@SecurityScheme(
        // 指定 SecurityScheme 的名称(OpenAPIDefinition注解中的security属性中会引用该名称)
        name = "Bearer Authentication",
//        // 指定认证类型为bearer
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)})
@Configuration(proxyBeanMethods = false)
@ConditionalOnProperty(name = "springdoc.api-docs.enabled", havingValue = "true")
public class SpringDocConfig {
}

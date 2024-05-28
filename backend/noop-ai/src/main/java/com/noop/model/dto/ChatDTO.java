package com.noop.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 聊天请求的请求体封装
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/28 8:42
 */
@Accessors(chain = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatDTO {

    @Schema(description = "聊天内容", required = true)
    @NotBlank(message = "聊天内容不能为空")
    private String input;
}

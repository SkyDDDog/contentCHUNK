package com.noop.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * 群发文章入参
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/25 22:54
 */
@Schema(description = "群发文章入参")
@Data
@Accessors(chain = true)
public class PublishDTO {

    @Schema(description = "标题", example = "这是一个标题")
    @NotBlank(message = "标题不能为空")
    private String title;

    @Schema(description = "内容", example = "1111111111")
    @NotBlank(message = "内容不能为空")
    private String content;

}

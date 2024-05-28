package com.noop.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 扩写DTO
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/28 10:38
 */
@Data
@Accessors(chain = true)
@NoArgsConstructor
@AllArgsConstructor
public class ExpandDTO {

    @Schema(description = "输入", required = true)
    @NotBlank(message = "输入不能为空")
    private String input;

}

package com.noop.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.experimental.Accessors;

/**
 * 用户注册交互类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/23 23:26
 */
@Schema(description = "用户注册入参")
@Data
@Accessors(chain = true)
public class RegisterDTO {

    @Schema(description = "用户名", example = "lear")
    @NotBlank(message = "用户名不能为空")
    private String username;

    @Schema(description = "密码", example = "123456")
    @NotBlank(message = "密码不能为空")
    private String password;

}

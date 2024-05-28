package com.noop.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 封装ai大模型的上下文对象
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/28 0:49
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class Context {

    private String role;

    private String content;

}

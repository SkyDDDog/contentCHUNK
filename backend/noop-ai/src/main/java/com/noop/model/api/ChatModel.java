package com.noop.model.api;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * ai大模型聊天请求的请求体封装
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/28 0:50
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ChatModel {

    private List<Context> history;

    private String input;

}

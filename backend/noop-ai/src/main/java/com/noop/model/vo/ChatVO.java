package com.noop.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * 聊天对话的返回值
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/28 8:11
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Accessors(chain = true)
public class ChatVO {

    private String code;

    private String msg;

    private String id;

    private String data;

}

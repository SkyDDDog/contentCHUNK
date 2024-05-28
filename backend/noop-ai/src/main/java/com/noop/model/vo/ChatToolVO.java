package com.noop.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

/**
 * TODO
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/28 21:54
 */
@Data
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class ChatToolVO {

    private String code;

    private String msg;

    private String id;

    private String step;

    private String data;

}

package com.noop.exception;

import com.noop.common.MsgCodeUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

/**
 * 业务异常类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/1/19 23:43
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class BusinessException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 2070023437618433443L;

    private final int code;

    private final String message;

    public BusinessException(String message) {
        super(message);
        this.code = MsgCodeUtil.MSG_CODE_UNKNOWN;
        this.message = message;
    }

    public BusinessException(String originalExceptionMessage, int code, String description) {
        super(originalExceptionMessage);
        this.code = code;
        this.message = description;
    }

    public BusinessException(int code, String message) {
        this.code = code;
        this.message = message;
    }



}

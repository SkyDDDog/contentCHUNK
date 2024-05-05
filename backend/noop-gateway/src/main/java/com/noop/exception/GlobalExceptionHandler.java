package com.noop.exception;

import com.noop.common.CommonResult;
import com.noop.common.MsgCodeUtil;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.ValidationException;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.validation.BindException;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 全局异常处理类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/5
 */
@RestControllerAdvice
public class GlobalExceptionHandler {


    @InitBinder
    public void handleInitBinder(WebDataBinder dataBinder) {
        dataBinder.registerCustomEditor(Date.class,
                new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd"), false));
    }

    /**
     * 处理参数验证异常
     *
     * @param e exception
     * @return ResponseResult
     */
    @ResponseBody
    @ExceptionHandler(value = {
            BindException.class,
            ValidationException.class
    })
    public CommonResult handleParameterVerificationException(Exception e) {
        List<String> exceptionMsg = new ArrayList<>();

        if (e instanceof BindException bindException) {
            bindException.getBindingResult().getAllErrors()
                    .forEach(a -> exceptionMsg.add(a.getDefaultMessage()));
        } else if (e instanceof ConstraintViolationException violationException) {
            violationException.getConstraintViolations()
                    .stream()
                    .map(ConstraintViolation::getMessage)
                    .forEach(exceptionMsg::add);
        } else {
            exceptionMsg.add("invalid parameter");
        }
        CommonResult result = new CommonResult().init();
        result.failCustom(MsgCodeUtil.MSG_CODE_JWT_ILLEGAL_ARGUMENT, String.join(",", exceptionMsg));
        return (CommonResult) result.end();
    }


    /**
     * 处理业务异常
     *
     * @param businessException business exception
     * @return ResponseResult
     */
    @ResponseBody
    @ExceptionHandler(BusinessException.class)
    public CommonResult processBusinessException(BusinessException businessException) {
        CommonResult result = new CommonResult().init();
        result.failCustom(businessException.getCode(), businessException.getMessage());
        return (CommonResult) result.end();
    }


    /**
     * 处理其他异常
     *
     * @param exception exception
     * @return ResponseResult
     */
    @ResponseBody
    @ExceptionHandler(Exception.class)
    public CommonResult processException(Exception exception) {
        CommonResult result = new CommonResult().init();
        result.fail();
        return (CommonResult) result.end();
    }

}

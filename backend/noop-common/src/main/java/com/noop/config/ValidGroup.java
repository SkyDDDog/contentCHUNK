package com.noop.config;

import jakarta.validation.GroupSequence;

/**
 * 分组校验-定义分组
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/4
 */
public class ValidGroup {

    public interface Create{}

    public interface Insert{}


    public interface Update{}


    public interface Delete{}

    @GroupSequence({Insert.class, Update.class,Delete.class})
    public interface All{}

}

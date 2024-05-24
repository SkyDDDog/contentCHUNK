package com.noop.common;

import com.alibaba.fastjson.JSONObject;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;

/**
 * 返回结果常用类
 * @author 天狗
 * @date 2024/01/19 23:40
 */
@Getter
@EqualsAndHashCode(callSuper = true)
@Slf4j
public class CommonResult extends BaseResult {

    private JSONObject item;

    @Override
    public CommonResult init() {
        super.init();
        this.item = new JSONObject();

        return this;
    }

    public CommonResult() {
    }

    public CommonResult(JSONObject item) {
        this.item = item;
    }

    public CommonResult(int msgCode, String errMsg, LocalDateTime receiptDateTime, LocalDateTime returnDateTime) {
        super(msgCode, errMsg, receiptDateTime, returnDateTime);
    }

    public CommonResult(int msgCode, String errMsg, LocalDateTime receiptDateTime, LocalDateTime returnDateTime, JSONObject item) {
        super(msgCode, errMsg, receiptDateTime, returnDateTime);
        this.item = item;
    }

    public CommonResult success(String key, Object value) {
        super.success();
        if (null != key && null != value) {
            this.item.put(key, value);
        }

        return this;
    }

    public void putItem(String key, Object value) {
        this.item.put(key, value);
    }

    public void setItem(JSONObject item) {
        this.item = item;
    }

    @Override
    public String toString() {
        return "CommonResult{" +
                "errMsg='" + errMsg + '\'' +
                ", item=" + item +
                '}';
    }

}

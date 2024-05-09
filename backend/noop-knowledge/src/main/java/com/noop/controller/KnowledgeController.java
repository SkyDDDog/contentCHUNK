package com.noop.controller;

import com.noop.common.CommonResult;
import com.noop.common.MsgCodeUtil;
import com.noop.config.ValidGroup;
import com.noop.exception.BusinessException;
import com.noop.model.dto.KnowledgeDTO;
import com.noop.model.vo.KnowledgeVO;
import com.noop.service.KnowledgeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TODO
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 22:40
 */
@Tag(name = "KnowledgeController", description = "知识库控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/knowledge")
@SecurityRequirement(name = "Bearer Authentication")
public class KnowledgeController {

    @Autowired
    private KnowledgeService knowledgeService;

    @Operation(summary = "获取用户知识库")
    @Parameters({
        @Parameter(name = "userId", description = "用户ID", required = true)
    })
    @GetMapping("/{userId}")
    public CommonResult getUserKnowledge(@PathVariable String userId) {
        CommonResult result = new CommonResult().init();
        if (!StringUtils.hasLength(userId)) {
            result.failCustom(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT,"用户ID不能为空");
            return (CommonResult) result.end();
        }
        List<KnowledgeVO> list = knowledgeService.getKnowledgeListByUserId(userId);
        result.success("knowledge", list);

        return (CommonResult) result.end();
    }



    @Operation(summary = "创建知识库")
    @PostMapping("/")
    public CommonResult createKnowledge(@Validated({ValidGroup.Create.class}) @RequestBody KnowledgeDTO dto, BindingResult bindingResult) {
        CommonResult result = new CommonResult().init();
        // 参数验证
        if (bindingResult.hasErrors()) {
            throw new BusinessException(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT, MsgCodeUtil.getIllegalArgumentMessage(bindingResult.getFieldErrors()));
        }
        if (knowledgeService.createKnowledge(dto)) {
            result.success();
        } else {
            result.failCustom("创建知识库失败");
        }
        return (CommonResult) result.end();
    }

    @Operation(summary = "更新知识库")
    @PutMapping("/")
    public CommonResult updateKnowledge(@Validated({ValidGroup.Update.class}) @RequestBody KnowledgeDTO dto, BindingResult bindingResult) {
        CommonResult result = new CommonResult().init();
        // 参数验证
        if (bindingResult.hasErrors()) {
            throw new BusinessException(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT, MsgCodeUtil.getIllegalArgumentMessage(bindingResult.getFieldErrors()));
        }
        if (knowledgeService.updateKnowledge(dto)) {
            result.success();
        } else {
            result.failCustom("修改知识库失败");
        }
        return (CommonResult) result.end();
    }

    @Operation(summary = "删除知识库")
    @DeleteMapping("/{id}")
    public CommonResult deleteKnowledge(@PathVariable String id) {
        CommonResult result = new CommonResult().init();
        if (!StringUtils.hasLength(id)) {
            result.failCustom(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT,"知识库ID不能为空");
            return (CommonResult) result.end();
        }
        if (knowledgeService.deleteKnowledge(id)) {
            result.success();
        } else {
            result.failCustom("删除知识库失败");
        }
        return (CommonResult) result.end();
    }

}

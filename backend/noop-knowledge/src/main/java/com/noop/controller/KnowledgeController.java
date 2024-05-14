package com.noop.controller;

import com.noop.common.CommonResult;
import com.noop.common.MsgCodeUtil;
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
        //TODO
        List<KnowledgeVO> list = knowledgeService.getKnowledgeListByUserId(userId);
        result.success("knowledge", list);

        return (CommonResult) result.end();
    }

    @Operation(summary = "更新知识库")
    @PostMapping("/{userId}")
    public CommonResult updateKnowledge(@PathVariable String userId, @RequestBody KnowledgeDTO dto) {
        CommonResult result = new CommonResult().init();
        if (dto == null) {
            result.failCustom(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT,"知识库数据不能为空");
            return (CommonResult) result.end();
        }
        boolean success = knowledgeService.updateKnowledge(userId, dto);
        if (success) {
            result.success();
        } else {
            result.failCustom("更新知识库失败");
        }
        return (CommonResult) result.end();
    }

    @Operation(summary = "删除知识库")
    @DeleteMapping("/{knowledgeId}")
    public CommonResult deleteKnowledge(@PathVariable String knowledgeId) {
        CommonResult result = new CommonResult().init();
        if (!StringUtils.hasLength(knowledgeId)) {
            result.failCustom(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT,"知识库ID不能为空");
            return (CommonResult) result.end();
        }
        boolean success = knowledgeService.deleteKnowledge(knowledgeId);
        if (success) {
            result.success();
        } else {
            result.failCustom("删除知识库失败");
        }
        return (CommonResult) result.end();
    }


}

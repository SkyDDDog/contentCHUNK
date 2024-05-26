package com.noop.controller;

import com.noop.common.CommonResult;
import com.noop.common.MsgCodeUtil;
import com.noop.model.dto.PageDTO;
import com.noop.model.vo.PageVO;
import com.noop.service.PageService;
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
 * 页面控制器
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 23:33
 */
@Tag(name = "PageController", description = "页面控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/page")
@SecurityRequirement(name = "Bearer Authentication")
public class PageController {

    @Autowired
    private PageService pageService;

//    @Operation(summary = "获取知识库中的页面")
//    @Parameters({
//        @Parameter(name = "knowledgeId", description = "知识库ID", required = true)
//    })
//    @GetMapping("/{knowledgeId}")
//    public CommonResult getKnowledgePage(@PathVariable String knowledgeId) {
//        CommonResult result = new CommonResult().init();
//        if (!StringUtils.hasLength(knowledgeId)) {
//            result.failCustom(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT,"用户ID不能为空");
//            return (CommonResult) result.end();
//        }
//        List<PageVO> list = pageService.getPageListByKnowledgeId(knowledgeId);
//        result.success("page", list);
//        return (CommonResult) result.end();
//    }

    @Operation(summary = "获取页面详情")
    @Parameters({
        @Parameter(name = "pageId", description = "页面ID", required = true)
    })
    @GetMapping("/detail/{pageId}")
    public CommonResult getPageDetail(@PathVariable String pageId) {
        CommonResult result = new CommonResult().init();
        if (!StringUtils.hasLength(pageId)) {
            result.failCustom(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT,"页面ID不能为空");
            return (CommonResult) result.end();
        }
        PageVO page = pageService.getPageById(pageId);
        result.success("page", page);
        return (CommonResult) result.end();
    }

//    @Operation(summary = "删除页面")
//    @DeleteMapping("/{pageId}")
//    public CommonResult deletePage(@PathVariable String pageId) {
//        CommonResult result = new CommonResult().init();
//        if (!StringUtils.hasLength(pageId)) {
//            result.failCustom(MsgCodeUtil.MSG_CODE_ILLEGAL_ARGUMENT,"页面ID不能为空");
//            return (CommonResult) result.end();
//        }
//        if (pageService.deletePage(pageId)) {
//            result.success();
//        } else {
//            result.failCustom("删除页面失败");
//        }
//        return (CommonResult) result.end();
//    }

//    @Operation(summary = "创建页面")
//    @PostMapping("/")
//    public CommonResult createPage(@RequestBody PageDTO dto) {
//        CommonResult result = new CommonResult().init();
//        if (pageService.createPage(dto)) {
//            result.success();
//        } else {
//            result.failCustom("创建页面失败");
//        }
//        return (CommonResult) result.end();
//    }

    @Operation(summary = "更新页面内容")
    @PutMapping("/")
    public CommonResult updatePage(@RequestBody PageDTO dto) {
        CommonResult result = new CommonResult().init();
        if (pageService.updatePage(dto)) {
            result.success();
        } else {
            result.failCustom("更新页面失败");
        }
        return (CommonResult) result.end();
    }

}

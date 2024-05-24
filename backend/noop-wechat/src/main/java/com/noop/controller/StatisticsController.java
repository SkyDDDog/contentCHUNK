package com.noop.controller;

import com.noop.common.CommonResult;
import com.noop.model.api.Article;
import com.noop.model.vo.WechatArticleDataVO;
import com.noop.model.vo.WechatUserSummaryVO;
import com.noop.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 微信数据控制器
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/24 13:12
 */
@Tag(name = "StatisticsController", description = "微信数据控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/statistics")
@SecurityRequirement(name = "Bearer Authentication")
public class StatisticsController {

    @Autowired
    private StatisticsService statisticsService;

    @Operation(summary = "获取微信文章数据")
    @GetMapping("/{userId}")
    public CommonResult publishArticle(@PathVariable String userId) {
        CommonResult result = new CommonResult().init();
        List<WechatArticleDataVO> vo = statisticsService.getArticleTotalData(userId);
        result.success("statistics", vo);
        return (CommonResult) result.end();
    }

    @Operation(summary = "获取上周用户变化量")
    @GetMapping("/user/{userId}")
    public CommonResult userSummary(@PathVariable String userId) {
        CommonResult result = new CommonResult().init();
        WechatUserSummaryVO vo = statisticsService.getUserSummary(userId);
        result.success("user", vo);
        return (CommonResult) result.end();
    }

}

package com.noop.controller;

import com.noop.common.CommonResult;
import com.noop.model.api.Article;
import com.noop.service.PublishService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 发布公众号文章控制器
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/16 21:10
 */
@Tag(name = "PublishController", description = "文章发布控制器")
@Slf4j
@CrossOrigin("*")
@RestController()
@RequestMapping(value = "/publish")
@SecurityRequirement(name = "Bearer Authentication")
public class PublishController {

    @Autowired
    private PublishService publishService;


    @Operation(summary = "发布文章(只会发布文章不会推送给用户,要推送给用户调用群发接口)")
    @Parameters({
            @Parameter(name = "userId", description = "用户id", required = true, schema = @Schema(type = "string")),
    })
    @PostMapping ("/publish")
    public CommonResult publishArticle(@RequestBody Article article, @RequestParam String userId) {
        CommonResult result = new CommonResult().init();
        String publish = publishService.publish(article, userId);
        result.success("publish_id", publish);
        log.info("发布文章结果：{}", publish);
        return (CommonResult) result.end();
    }

    @Operation(summary = "群发文章")
    @Parameters({
            @Parameter(name = "userId", description = "用户id", required = true, schema = @Schema(type = "string")),
    })
    @PostMapping("/send")
    public CommonResult sendToAll(@RequestBody Article article, @RequestParam String userId) {
        CommonResult result = new CommonResult().init();
        boolean send = publishService.send(article, userId);
        if (!send) {
            return (CommonResult) result.fail().end();
        }
        result.success();
        return (CommonResult) result.end();
    }


    @Operation(summary = "发布状态轮询接口(开发者可以尝试通过下面的发布状态轮询接口获知发布情况。)")
    @Parameters({
//            @Parameter(name = "publishId", description = "从发布文章接口获取的publish_id", required = true, schema = @Schema(type = "string")),
            @Parameter(name = "userId", description = "用户id", required = true, schema = @Schema(type = "string")),
    })
    @GetMapping("/{publishId}")
    public CommonResult checkPublishId(@PathVariable String publishId, @RequestParam String userId) {
        CommonResult result = new CommonResult().init();
        String articleUrl = publishService.checkPublishId(publishId, userId);
        if (!StringUtils.hasLength(articleUrl)) {
            return (CommonResult) result.fail().end();
        }
        result.success("articleUrl", articleUrl);
        return (CommonResult) result.end();
    }

    @Operation(summary = "删除文章")
    @Parameters({
            @Parameter(name = "userId", description = "用户id", required = true, schema = @Schema(type = "string")),
    })
    @DeleteMapping("/{articleId}")
    public CommonResult deleteArticle(@PathVariable String articleId, @RequestParam String userId) {
        CommonResult result = new CommonResult().init();
        publishService.freeArticle(articleId, userId);
        return (CommonResult) result.end();
    }

    @Operation(summary = "上传图片至微信图床")
    @Parameters({
            @Parameter(name = "userId", description = "用户id", required = true, schema = @Schema(type = "string")),
    })
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public CommonResult uploadImg(@RequestPart("file") MultipartFile file, @RequestParam String userId) {
        CommonResult result = new CommonResult().init();
        String url = publishService.uploadImg(file, userId);
        result.success("image", url);
        return (CommonResult) result.end();
    }

}

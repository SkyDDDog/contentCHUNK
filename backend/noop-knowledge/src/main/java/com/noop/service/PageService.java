package com.noop.service;

import com.noop.model.dto.PageDTO;
import com.noop.model.vo.PageVO;

import java.util.List;

/**
 * 页面服务接口类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:41
 */
public interface PageService {

//    /**
//     * 创建页面
//     * @param dto   页面数据传输对象
//     * @return  创建成功返回true，否则返回false
//     */
//    boolean createPage(PageDTO dto);

//    /**
//     * 删除页面
//     * @param pageId    页面ID
//     * @return  删除成功返回true，否则返回false
//     */
//    boolean deletePage(String pageId);

    /**
     * 更新页面
     * @param dto   页面数据传输对象
     * @return  更新成功返回true，否则返回false
     */
    boolean updatePage(PageDTO dto);
//
//    /**
//     * 获取页面列表
//     * @param knowledgeId   知识库ID
//     * @return  页面列表
//     */
//    List<PageVO> getPageListByKnowledgeId(String knowledgeId);

    PageVO getPageById(String pageId);

}

package com.noop.service;

import com.noop.model.dto.KnowledgeDTO;
import com.noop.model.vo.KnowledgeVO;

import java.util.List;

/**
 * 知识库服务接口类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:40
 */
public interface KnowledgeService {

    /**
     * 根据用户ID获取用户知识库列表
     * @param userId    用户ID
     * @return  知识库列表
     */
    List<KnowledgeVO> getKnowledgeListByUserId(String userId);

    /**
     * 创建知识库
     * @param dto   知识库数据传输对象
     * @return  是否创建成功
     */
    boolean createKnowledge(KnowledgeDTO dto);

    /**
     * 更新知识库
     * @param dto   知识库数据传输对象
     * @return  是否更新成功
     */
    boolean updateKnowledge(KnowledgeDTO dto);

    /**
     * 删除知识库
     * @param id    知识库ID
     * @return  是否删除成功
     */
    boolean deleteKnowledge(String id);

}
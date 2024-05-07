package com.noop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.noop.exception.BusinessException;
import com.noop.mapper.KnowledgeMapper;
import com.noop.model.dto.KnowledgeDTO;
import com.noop.model.entity.Knowledge;
import com.noop.model.entity.UserKnowledge;
import com.noop.model.vo.KnowledgeVO;
import com.noop.service.KnowledgeService;
import com.noop.util.orm.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 知识库服务实现类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:45
 */
@Service
public class KnowledgeServiceImpl extends CrudService<KnowledgeMapper, Knowledge> implements KnowledgeService {

    @Autowired
    private UserKnowledgeServiceImpl userKnowledgeService;
    @Override
    public List<KnowledgeVO> getKnowledgeListByUserId(String userId) {
        QueryWrapper<UserKnowledge> userWrapper = new QueryWrapper<>();
        userWrapper.lambda().eq(UserKnowledge::getUserId, userId);
        List<UserKnowledge> ukList = userKnowledgeService.findList(userWrapper);
        List<KnowledgeVO> result = new ArrayList<>(ukList.size());
        for (UserKnowledge uk : ukList) {
            KnowledgeVO vo = new KnowledgeVO();
            Knowledge knowledge = this.get(uk.getKnowledgeId());
            vo.setId(knowledge.getId())
                    .setTitle(knowledge.getTitle());
            result.add(vo);
        }
        return result;
    }

    @Transactional(rollbackFor = BusinessException.class)
    @Override
    public boolean createKnowledge(KnowledgeDTO dto) {
        String id = IdWorker.getIdStr();
        Knowledge knowledge = new Knowledge();
        knowledge.setTitle(dto.getTitle());
        knowledge.setId(id);
        knowledge.setNewRecord(true);
        if (this.save(knowledge)<0) {
            throw new BusinessException("创建知识库失败");
        }
        UserKnowledge userKnowledge = new UserKnowledge();
        userKnowledge.setUserId(dto.getUserId());
        userKnowledge.setKnowledgeId(id);
        userKnowledge.setNewRecord(true);
        if (userKnowledgeService.save(userKnowledge)<0) {
            throw new BusinessException("创建用户-知识库失败");
        }
        return true;
    }

    @Override
    public boolean updateKnowledge(KnowledgeDTO dto) {
        String id = dto.getKnowledgeId();
        Knowledge knowledge = this.get(id);
        if (!StringUtils.hasLength(dto.getTitle())) {
            return false;
        }
        knowledge.setTitle(dto.getTitle());
        return this.save(knowledge) > 0;
    }

    @Transactional(rollbackFor = BusinessException.class)
    @Override
    public boolean deleteKnowledge(String id) {
        Knowledge knowledge = this.get(id);
        if (this.delete(knowledge)<0) {
            throw new BusinessException("删除知识库失败");
        }
        QueryWrapper<UserKnowledge> userWrapper = new QueryWrapper<>();
        userWrapper.lambda().eq(UserKnowledge::getKnowledgeId, id);
        List<UserKnowledge> list = userKnowledgeService.findList(userWrapper);
        if (CollectionUtils.isEmpty(list) || userKnowledgeService.delete(list.get(0)) < 0) {
            throw new BusinessException("删除用户-知识库失败");
        }

        return true;
    }
}

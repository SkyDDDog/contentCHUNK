package com.noop.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.IdWorker;
import com.noop.exception.BusinessException;
import com.noop.mapper.PageMapper;
import com.noop.model.dto.PageDTO;
import com.noop.model.entity.KnowledgePage;
import com.noop.model.entity.Page;
import com.noop.model.vo.PageVO;
import com.noop.service.PageService;
import com.noop.util.orm.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 页面服务实现类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:45
 */
@Service
public class PageServiceImpl extends CrudService<PageMapper, Page> implements PageService {

    @Autowired
    private KnowledgePageServiceImpl knowledgePageService;

    @Transactional(rollbackFor = BusinessException.class)
    @Override
    public boolean createPage(PageDTO dto) {
        String id = IdWorker.getIdStr();
        KnowledgePage knowledgePage = new KnowledgePage();
        knowledgePage.setKnowledgeId(dto.getKnowledgeId())
                .setPageId(id);
        knowledgePage.setNewRecord(true);
        if (knowledgePageService.save(knowledgePage)<0) {
            throw new BusinessException("创建知识库-页面失败");
        }

        Page page = new Page();
        page.setId(id);
        page.setContent(dto.getContent());
        page.setNewRecord(true);
        if (this.save(page)<0) {
            throw new BusinessException("创建页面失败");
        }

        return true;
    }

    @Transactional(rollbackFor = BusinessException.class)
    @Override
    public boolean deletePage(String pageId) {
        Page page = this.get(pageId);
        if (this.delete(page)<0) {
            throw new BusinessException("删除页面失败");
        }
        QueryWrapper<KnowledgePage> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(KnowledgePage::getPageId, pageId);
        List<KnowledgePage> list = knowledgePageService.findList(wrapper);
        if (CollectionUtils.isEmpty(list) || knowledgePageService.delete(list.get(0))<0) {
            throw new BusinessException("删除知识库-页面失败");
        }

        return true;
    }

    @Override
    public boolean updatePage(PageDTO dto) {
        String id = dto.getPageId();
        Page page = this.get(id);
        if (!StringUtils.hasLength(dto.getContent())) {
            return false;
        }
        page.setContent(dto.getContent());

        return this.save(page) > 0;
    }

    @Override
    public List<PageVO> getPageListByKnowledgeId(String knowledgeId) {
        QueryWrapper<KnowledgePage> wrapper = new QueryWrapper<>();
        wrapper.lambda().eq(KnowledgePage::getKnowledgeId, knowledgeId);
        List<KnowledgePage> list = knowledgePageService.findList(wrapper);
        List<PageVO> result = new ArrayList<>(list.size());
        for (KnowledgePage kp : list) {
            result.add(this.getPageById(kp.getPageId()));
        }

        return result;
    }

    @Override
    public PageVO getPageById(String pageId) {
        Page page = this.get(pageId);
        PageVO vo = new PageVO();
        vo.setPageId(page.getId())
                .setContent(page.getContent());
        return vo;
    }
}

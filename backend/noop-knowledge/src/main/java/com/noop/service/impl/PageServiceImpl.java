package com.noop.service.impl;

import com.noop.mapper.PageMapper;
import com.noop.model.dto.PageDTO;
import com.noop.model.entity.Page;
import com.noop.model.vo.PageVO;
import com.noop.service.PageService;
import com.noop.util.orm.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

/**
 * 页面服务实现类
 *
 * @author 天狗
 * @version 1.0
 * @date 2024/2/2 19:45
 */
@Service
public class PageServiceImpl extends CrudService<PageMapper, Page> implements PageService {

    @Override
    public boolean updatePage(PageDTO dto) {
        String id = dto.getPageId();
        Page page = this.get(id);
        if (page==null) {
            return false;
        }
        if (!StringUtils.hasLength(dto.getContent())) {
            return false;
        }
        page.setContent(dto.getContent());

        return this.save(page) > 0;
    }

    @Override
    public PageVO getPageById(String pageId) {
        Page page = this.get(pageId);
        if (page==null) {
            return null;
        }
        PageVO vo = new PageVO();
        vo.setPageId(page.getId())
                .setContent(page.getContent());
        return vo;
    }
}

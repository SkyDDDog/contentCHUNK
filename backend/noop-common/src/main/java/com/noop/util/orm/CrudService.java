package com.noop.util.orm;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * 增删改查基本服务类
 *
 * @author 天狗
 * @version 1.0
 * @since 2024/5/4
 */
public class CrudService<M extends BaseMapper<T>,T extends DataEntity<T>> {

    @Autowired
    protected M mapper;


    public CrudService() {
    }

    /**
     * 根据id查询
     * @param id    id，一般是主键
     * @return    实体
     */
    public T get(String id) {
        QueryWrapper<T> wrapper = new QueryWrapper<T>().eq("id", id);
        List<T> list = this.findList(wrapper);
        if (!list.isEmpty()) {
            return list.get(0);
        } else {
            return null;
        }
//        return this.mapper.selectById(id);
    }

    /**
     * 查询所有数据
     * @return  实体集合
     */
    public List<T> findAll() {
        return this.mapper.selectList(null);
    }

    /**
     * 根据条件查询(默认不查询已逻辑删除的数据)
     * @param wrapper   查询条件
     * @return  实体集合
     */
    public List<T> findList(QueryWrapper<T> wrapper) {
        wrapper.eq("del_flag",0);
        return this.mapper.selectList(wrapper);
    }

    /**
     * 根据条件查询(默认查询已逻辑删除的数据)
     * @param wrapper   查询条件
     * @return  实体集合
     */
    public List<T> findAllList(QueryWrapper<T> wrapper) {
        return this.mapper.selectList(wrapper);
    }

    /**
     * 保存或更新
     * 根据DataEntity的isNewRecord属性判断是否为新增
     * @param entity    实体
     * @return  影响行数
     */
    public int save(T entity) {
        int result = 0;
        if (entity.isNewRecord()) {
            entity.preInsert();
            result = this.mapper.insert(entity);
        } else {
            entity.preUpdate();
            result = this.mapper.updateById(entity);
        }
        return result;
    }

    /**
     * 逻辑删除数据
     * @param entity    实体
     * @return  影响行数
     */
    public int delete(T entity) {
        int result = 0;
        if (entity != null) {
            entity.setDelFlag("1");
            entity.preUpdate();
            result = this.mapper.updateById(entity);
        }
        return result;
    }

}

// 定义一个函数来根据 key 查找数组中的项
export function findItemByKey(data, keyToFind) {
  // 遍历数组
  for (let i = 0; i < data.length; i++) {
    const currentItem = data[i]
    // 如果当前项的 key 等于要查找的 key，则返回当前项
    if (currentItem.key === keyToFind) {
      return currentItem
    }
    // 如果当前项有 children 属性，则递归调用该函数查找子项
    if (currentItem.children) {
      const foundChild = findItemByKey(currentItem.children, keyToFind)
      if (foundChild) {
        return foundChild
      }
    }
  }
  // 如果没有找到对应的项，则返回 null
  return null
}

// 定义一个递归函数，用于在子项中查找并更新对应的项
export const updateTitleByKeyInChildren = (children, keyToUpdate, newData) => {
  return children.map((child) => {
    if (child.key === keyToUpdate) {
      return {
        ...child,
        title: newData,
      }
    } else if (child.children) {
      return {
        ...child,
        children: updateTitleByKeyInChildren(
          child.children,
          keyToUpdate,
          newData,
        ),
      }
    }
    return child
  })
}

// 定义一个递归函数，用于在子项中查找并删除对应的项
export const deleteItemByKeyInChildren = (children, keyToDelete) => {
  return children.filter((child) => {
    if (child.key === keyToDelete) {
      // 如果找到了对应的项，则过滤掉该项，即删除
      return false
    } else if (child.children) {
      // 如果当前子项有子项，则递归调用该函数查找子项并删除
      child.children = deleteItemByKeyInChildren(child.children, keyToDelete)
      return true
    }
    // 如果没有找到对应的项，则保留原始子项
    return true
  })
}

// 添加：有children就追加，没有就添加

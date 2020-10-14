// 去掉root节点的树型结构 (在用)
export const makeDataToChildren = (source, id, parent_id, rootId) => {
  let cloneData = JSON.parse(JSON.stringify(source)).filter(
    (item) => item[parent_id] !== rootId
  )
  let leafMenu = []
  const result = cloneData.filter((father) => {
    let children = []
    for (let i = 0; i < cloneData.length; i++) {
      if (father[id] === cloneData[i][parent_id]) {
        children.push(cloneData[i])
        // 数组去重
        if (leafMenu.indexOf(cloneData[i][id]) === -1) {
          leafMenu.push(cloneData[i][id])
        }
      }
    }
    if (children.length > 0) {
      father.children = children
    }
    return leafMenu.indexOf(father[id]) === -1
  })
  return result
}

// 包含根节点等所有节点
export function toTree(source, { id, parentId, children, rootId }) {
  let cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter((father) => {
    let branchArr = cloneData.filter((child) => father[id] === child[parentId])
    if (branchArr.length > 0) {
      father[children] = branchArr
    }
    return father[parentId] === rootId // 如果第一层不是parentId=0，请自行修改
  })
}

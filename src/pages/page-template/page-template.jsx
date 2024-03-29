import React, { useState, useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { Card, Tabs } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { serverStaticPath } from '../../config/config'
import './page-template.less'
import { asyncReqImageCards } from '../../redux/actions/menu-action'

const { TabPane } = Tabs;
const { Meta } = Card;

function PageTemplate(props) {
  const { asyncReqImageCards, imageCards, menuListByChildrenAllInfo } = props
  const { moduleName } = useParams()
  // 选项卡被选中的key
  const [selectTabKey, setSelectTabKey] = useState('all')

  // 某个菜单下的所有数据, 根据路由的名称筛选cards中的某个类别的数据集
  const cards = useMemo(() => {
    return imageCards && imageCards.filter(item => item.class_type === moduleName)
  }, [moduleName, imageCards])

  // 某个菜单的数据对象, 为了取一级菜单分类中的标题
  const menuObj = useMemo(() => {
    return menuListByChildrenAllInfo.filter(item => item.MenuPath.indexOf(moduleName) !== -1)[0]
  }, [menuListByChildrenAllInfo, moduleName])

  // 生成某个一级分类的子标签的所有card DOM标签数组
  const paneData = useMemo(() => {
    if (!cards) {
      return
    }
    let res
    if (selectTabKey === 'all') {
      res = cards
    } else {
      res = cards.filter(item => item.type === selectTabKey)
    }

    return res.reduce((pre, item, index) => {
      pre.push(
        <Link
          to={{
            pathname: item.path,
            state: { id: item.id },    // 传递当前card主题的id, 在明细中根据这个id查询明细表中的parent_id进行关联
          }}
          key={index}
        >
          <div className="card-item">
            <Card
              hoverable
              cover={<img alt={item.title} src={serverStaticPath + item.coverImg} />}
              bordered={false}
            >
              <Meta title={item.title} />
            </Card>
          </div>
        </Link>
      )
      return pre
    }, [])
  }, [cards, selectTabKey])


  const tabPane = useMemo(() => {
    if (!cards) {
      return
    }
    let TabPanes = []
    TabPanes.push(
      <TabPane tab="All" key="all" className="tab-pane-tab">
        {paneData}
      </TabPane>
    )
    let arr_temp = []
    cards.forEach(item => arr_temp.push(item.type))
    let distinctType = Array.from(new Set(arr_temp))
    distinctType.forEach(item => {
      TabPanes.push(
        <TabPane tab={item} key={item} className="tab-pane-tab">
          {paneData}
        </TabPane>
      )
    })
    return TabPanes
  }, [paneData, cards])

  // 加载菜单详细数据项目
  useEffect(() => {
    const getMenus = async () => {
      if (imageCards && imageCards.length > 0) {
        return
      }
      // 重新请求并将数据设置到store上
      await asyncReqImageCards()
    }
    getMenus()
  }, [imageCards, asyncReqImageCards])

  const handleTabChange = key => {
    setSelectTabKey(key)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }

  // 处理菜单子项的选中项
  useEffect(() => {
    setSelectTabKey('all')
  }, [props.history.location.pathname])

  return (
    <div className="template-container">
      <h3 className="template-title">{menuObj && menuObj.MenuDesc}</h3>
      <Tabs
        centered
        type="card"
        animated={true}
        tabBarGutter={6}
        tabPosition="top"
        activeKey={selectTabKey}
        onChange={handleTabChange}
        style={{ height: '100%' }}
        tabBarStyle={{
          color: '#fff',
          fontWeight: 'bold',
        }}
      >
        {tabPane}
      </Tabs>
    </div>
  )
}

export default connect(
  state => ({
    imageCards: state.imageCards,
    menuListByChildrenAllInfo: state.menuListByChildrenAllInfo
  }),
  { asyncReqImageCards }
)(PageTemplate);
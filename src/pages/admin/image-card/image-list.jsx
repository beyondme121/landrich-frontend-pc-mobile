import React, { useEffect, useState, useMemo } from 'react'
import { Table, Card, Space, Button, message } from 'antd'
import { connect } from 'react-redux'
import { reqGetImageCardDetailAll, reqGetTabMenuMapping } from '../../../api'
import './image-list.less'

function ImageList(props) {
  const { menuListByChildrenAllInfo } = props
  const [imageCardDetailList, setImageCardDetailList] = useState([])
  const [tabMenuMapping, setTabMenuMapping] = useState([])
  const [selectMenuItem, setSelectMenuItem] = useState('')

  // 1. 一级菜单数据整合
  const filterMenu = useMemo(() => {
    return menuListByChildrenAllInfo && menuListByChildrenAllInfo.reduce((pre, item) => {
      if (item.Type === 'client') {
        pre.push({
          text: item.MenuNameEN.toLowerCase(),
          value: item.MenuNameEN.toLowerCase()
        })
      }
      return pre
    }, [])
  }, [menuListByChildrenAllInfo])

  console.log("tabMenuMapping:", tabMenuMapping)

  // 2. tab数据整合
  const filterTab = useMemo(() => {
    return selectMenuItem && tabMenuMapping && tabMenuMapping.reduce((pre, item) => {
      if (
        selectMenuItem.class_type &&
        selectMenuItem.class_type.indexOf(item.MenuNameEN.toLowerCase()) !== -1) {
        pre.push({
          text: item.TabNameEN,
          value: item.TabNameEN,
        })
      }
      return pre
    }, [])
  }, [selectMenuItem, tabMenuMapping])

  // 3. 事件处理
  const handleChange = (pagination, filters, sorter) => {
    setSelectMenuItem(filters)
  }

  const title = (
    <Space>
      <Button type="primary" onClick={() => { props.history.push('/admin/image/form') }}>创建内容</Button>
    </Space>
  )
  const columns = useMemo(() => {
    return [
      {
        title: '内容标题',
        dataIndex: 'title',
        width: 200,
      },
      {
        title: '封面图片路径',
        dataIndex: 'coverImg',
        width: 250,
      },
      {
        title: '菜单',
        dataIndex: 'class_type',
        width: 80,
        filters: filterMenu,
        // filterMultiple: false
        onFilter: (value, record) => record.class_type.indexOf(value) === 0,
      },
      {
        title: '选项',
        dataIndex: 'type',
        width: 80,
        filters: filterTab,
        onFilter: (value, record) => record.type.indexOf(value) === 0,
      },
      {
        title: '首页分类',
        dataIndex: 'homepage_type',
        width: 80
      },
      {
        title: '明细标题',
        dataIndex: 'detail_title',
        width: 200,
      },
      {
        title: '明细图片路径集合',
        dataIndex: 'imgURLS',
        ellipsis: true,
      },
    ]
  }, [filterMenu, filterTab]);

  // 1. 请求明细数据
  useEffect(() => {
    let fn = async () => {
      let res = await reqGetImageCardDetailAll()
      if (res.code === 0) {
        setImageCardDetailList(res.data)
      } else {
        message.warning('获取数据异常')
      }
    }
    fn()
  }, [])

  // 2. 创建Menu和tab的mapping
  useEffect(() => {
    let fn = async () => {
      let res = await reqGetTabMenuMapping()
      if (res.code === 0) {
        setTabMenuMapping(res.data)
      } else {
        message.warning('获取数据异常')
      }
    }
    fn()
  }, [])

  return (
    <div className="image-list">
      <Card
        title={title}
      >
        <Table
          bordered
          dataSource={imageCardDetailList}
          columns={columns}
          rowKey="id"
          size="middle"
          pagination={{ pageSize: 1000 }}
          scroll={{ x: '80%', y: 450 }}     // 和column中的width一起使用才能指定列宽度和固定表头
          onChange={handleChange}
        />
      </Card>
    </div>
  )
}

export default connect(
  state => ({
    menuList: state.menuList,
    menuListByChildrenAllInfo: state.menuListByChildrenAllInfo
  })
)(ImageList)


import React, { useEffect, useState, useMemo } from 'react'
import { Table, Card, Space, Button, message } from 'antd'
import { connect } from 'react-redux'
import { reqGetImageCardDetailAll } from '../../../api'

function ImageList(props) {
  const { menuListByChildrenAllInfo } = props
  const [imageCardDetailList, setImageCardDetailList] = useState([])

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
        title: '归属菜单',
        dataIndex: 'class_type',
        width: 80,
        filters: filterMenu,
        // filterMultiple: false
        onFilter: (value, record) => record.class_type.indexOf(value) === 0,
      },
      {
        title: 'Tab分类',
        dataIndex: 'type',
        width: 80
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
      },
    ]
  }, [filterMenu]);

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

  // const MenuInfoMapping = useMemo(() => {
  //   let obj = {}
  //   menuList.map(item => {
  //     obj[item.MenuId] = item['MenuNameEN']
  //   })
  //   return obj
  // }, [menuList])

  return (
    <Card
      title={title}
    >
      <Table
        bordered
        dataSource={imageCardDetailList}
        columns={columns}
        rowKey="id"
        size="middle"
        pagination={{ pageSize: 50 }}
        scroll={{ x: 1800, y: 600 }}     // 和column中的width一起使用才能指定列宽度和固定表头
      />
    </Card>
  )
}

export default connect(
  state => ({
    menuList: state.menuList,
    menuListByChildrenAllInfo: state.menuListByChildrenAllInfo
  })
)(ImageList)


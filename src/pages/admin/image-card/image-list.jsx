import React, { useEffect, useState, useMemo } from 'react'
import { Table, Card, Space, Button, message, Modal } from 'antd'
import { connect } from 'react-redux'
import { reqGetImageCardDetailAll, reqGetTabMenuMapping, reqDeleteImageCardById } from '../../../api'
import './image-list.less'
const { confirm } = Modal

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

  // 4. 确认框 (确认删除)
  const showModalConfirm = (item) => {
    let content = (
      <>
        <p style={{ marginTop: '20px' }}>{item.title}</p>
      </>
    )
    confirm({
      title: <strong>{`确认删除${item.title}吗`}</strong>,
      content: content,
      onOk: async () => {
        let res = await reqDeleteImageCardById(item.id)
        if (res.code === 0) {
          message.success(`删除成功`)
          let res = await reqGetImageCardDetailAll()
          if (res.code === 0) {
            setImageCardDetailList(res.data)
          } else {
            message.warning('获取数据异常')
          }
        }
      },
      onCancel() {
      },
    })
  }

  const title = (
    <Space>
      <Button type="primary" onClick={() => { props.history.push('/admin/image/form') }}>创建内容</Button>
    </Space>
  )
  const columns = [
    {
      title: '编辑',
      width: 100,
      render: item => {
        return (
          <Space>
            <span
              style={{ color: '#1890FF', userSelect: 'none', cursor: 'pointer' }}
              onClick={() => props.history.push('/admin/image/form', item)}>
              修改
              </span>
            <span
              style={{ color: '#1890FF', userSelect: 'none', cursor: 'pointer' }}
              onClick={() => showModalConfirm(item)}>
              删除
              </span>
          </Space>
        )
      }
    },
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


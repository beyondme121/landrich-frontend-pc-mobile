import React from 'react'
import { connect } from 'react-redux'
import { Table, Card, Space, Button } from 'antd'
// import { asyncReqMenuList } from '../../../redux/actions/menu-action'

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'MenuNameEN',
  },
  {
    title: '菜单路径',
    dataIndex: 'MenuPath',
  },
  {
    title: '菜单类别',
    dataIndex: 'Type',
  },
  {
    title: '授权类型',
    dataIndex: 'AuthType',
  },
  {
    title: '排序字段',
    dataIndex: 'SortKey',
  }
];

function MenuList(props) {
  let { menuList } = props
  const title = (
    <Space>
      <Button type="primary" onClick={() => { props.history.push('/admin/menu/form') }}>创建菜单</Button>
    </Space>
  )

  return (
    <Card
      title={title}
    >
      <Table bordered dataSource={menuList} columns={columns} rowKey="MenuId" />
    </Card>
  )
}

export default connect(
  state => ({
    menuList: state.menuList
  })
)(MenuList)

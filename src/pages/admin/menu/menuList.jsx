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
    title: '菜单名称',
    dataIndex: 'MenuNameCN',
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
    <div className="menu-list">
      <Card
        title={title}
      >
        <Table
          bordered
          dataSource={menuList}
          columns={columns}
          rowKey="MenuId"
          size="middle"
          pagination={{ pageSize: 50 }}
          scroll={{ x: '80%', y: 450 }}
        />
      </Card>
    </div>

  )
}

export default connect(
  state => ({
    menuList: state.menuList
  })
)(MenuList)

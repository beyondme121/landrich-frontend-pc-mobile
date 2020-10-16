import React, { useEffect, useState, useMemo } from 'react'
import { Table, Card, Space, Button, message } from 'antd'
import { connect } from 'react-redux'
import { reqGetTabList } from '../../../api'

function TabList(props) {
  let { menuList } = props
  const [tabList, setTabList] = useState([])


  useEffect(() => {
    let fn = async () => {
      let res = await reqGetTabList()
      if (res.code === 0) {
        setTabList(res.data)
      } else {
        message.warning('获取数据异常')
      }
    }
    fn()
  }, [])

  const MenuInfoMapping = useMemo(() => {
    let obj = {}
    menuList.map(item => {
      return obj[item.MenuId] = item['MenuNameEN']
    })
    return obj
  }, [menuList])

  const title = (
    <Space>
      <Button type="primary" onClick={() => { props.history.push('/admin/tab/form') }}>创建Tab选项</Button>
    </Space>
  )
  const columns = useMemo(() => {
    return [
      {
        title: 'Tab英文名称',
        dataIndex: 'TabNameEN',
      },
      {
        title: 'Tab中文名称',
        dataIndex: 'TabNameCN',
      },
      {
        title: '归属菜单',
        render: data => {
          return (
            <span>{MenuInfoMapping && MenuInfoMapping[data.MenuId]}</span>
          )
        }
      },
      {
        title: '排序字段',
        dataIndex: 'SortKey',
      },
      {
        title: '创建时间',
        dataIndex: 'CreateTime',
      }
    ]
  }, [MenuInfoMapping]);

  return (
    <div className="tab-list">
      <Card
        title={title}
      >
        <Table
          bordered
          dataSource={tabList}
          columns={columns}
          rowKey="TabId"
          size="middle"
          pagination={{ pageSize: 1000 }}
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
)(TabList)


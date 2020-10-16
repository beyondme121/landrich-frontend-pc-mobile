import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Card, TreeSelect, message } from 'antd';
import { asyncReqMenuList } from '../../../redux/actions/menu-action'
import { reqCreateTab } from '../../../api'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};
const cardStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: '#fff',
  padding: '20px 50px'
}
const { Item } = Form

function TabForm(props) {
  const { menuListByChildren } = props
  const [MenuId, setMenuId] = useState('')

  const handleMenuTreeChange = MenuId => {
    setMenuId(MenuId)
  }

  const onFinish = async values => {
    let res = await reqCreateTab(values)
    if (res.code === 0) {
      message.success(`选项${res.data.TabNameEN}创建成功`)
      props.history.push('/admin/tab/list')
    }
  };

  return (
    <Card title="创建选项" style={cardStyle}>
      <Form
        {...layout}
        name="tab-item"
        initialValues={{}}
        onFinish={onFinish}
      >
        <Item
          label="选项英文名称"
          name="TabNameEN"
          rules={[{ required: true, message: '请输入选项英文名称' }]}
        >
          <Input />
        </Item>
        <Item
          label="选项中文名称"
          name="TabNameCN"
          rules={[{ required: true, message: '请输入选项中文名称' }]}
        >
          <Input />
        </Item>
        <Item
          label="归属菜单"
          name="MenuId"
          rules={[{ required: true, message: '请选择归属菜单' }]}
        >
          <TreeSelect
            value={MenuId}
            onChange={handleMenuTreeChange}
            treeData={menuListByChildren}
            treeDefaultExpandAll
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 900, overflow: 'auto' }}
            placeholder="Please select"
          />
        </Item>
        <Item
          label="选项排序字段"
          name="SortKey"
          wrapperCol={{ span: 4 }}
          rules={[{ required: true, message: '请输入排序序号' }]}
        >
          <Input type="number" />
        </Item>
        <Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Item>
      </Form>
    </Card >

  )
}
export default connect(
  state => ({
    menuListByChildren: state.menuListByChildren
  }),
  { asyncReqMenuList }
)(TabForm)
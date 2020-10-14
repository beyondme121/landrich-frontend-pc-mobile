import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Card, Select, TreeSelect, message } from 'antd';
import { asyncReqMenuList } from '../../../redux/actions/menu-action'
import { reqCreateMenu } from '../../../api'

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
const { Option } = Select;

function MenuForm(props) {
  const { menuListByChildren, asyncReqMenuList } = props

  const [ParentMenuId, setParentMenuId] = useState('')
  console.log("menuListByChildren:", menuListByChildren)


  const handleMenuTreeChange = value => {
    setParentMenuId(value)
  }

  const onFinish = async values => {
    let res = await reqCreateMenu(values)
    if (res.code === 0) {
      message.success(`菜单${res.data.MenuNameEN}创建成功`)
      await asyncReqMenuList()
      props.history.push('/admin/menu')
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
  }
  const handleChange2 = (value) => {
    console.log(`selected ${value}`);
  }

  return (
    <Card title="菜单管理" style={cardStyle}>
      <Form
        {...layout}
        name="menu-item"
        initialValues={{ Type: 'admin', AuthType: 'authorized' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Item
          label="菜单英文名称"
          name="MenuNameEN"
          rules={[{ required: true, message: '请输入菜单英文名称' }]}
        >
          <Input />
        </Item>
        <Item
          label="菜单中文名称"
          name="MenuNameCN"
          rules={[{ required: true, message: '请输入菜单中文名称' }]}
        >
          <Input />
        </Item>
        <Item
          label="菜单描述"
          name="MenuDesc"
        >
          <Input />
        </Item>
        <Item
          label="菜单访问路径"
          name="MenuPath"
          rules={[{ required: true, message: '请输入菜单路径' }]}
        >
          <Input />
        </Item>
        <Item
          label="父级菜单"
          name="ParentMenuId"
          rules={[{ required: true, message: '请选择父级菜单' }]}
        >
          <TreeSelect
            value={ParentMenuId}
            onChange={handleMenuTreeChange}
            treeData={menuListByChildren}
            treeDefaultExpandAll
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 900, overflow: 'auto' }}
            placeholder="Please select"
          />
        </Item>
        <Item
          label="菜单类别"
          name="Type"
          rules={[{ required: true, message: '请选择菜单类别' }]}
        >
          <Select style={{ width: 120 }} onChange={handleChange1}>
            <Option value="admin">管理端</Option>
            <Option value="client">客户端</Option>
          </Select>
        </Item>
        <Item
          label="授权类型"
          name="AuthType"
          rules={[{ required: true, message: '请选择授权类型' }]}
        >
          <Select style={{ width: 120 }} onChange={handleChange2}>
            <Option value="authorized">权限控制</Option>
            <Option value="public">公开</Option>
          </Select>
        </Item>
        <Item
          label="排序字段"
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
    menuList: state.menuList,
    menuListByChildren: state.menuListByChildren
  }),
  { asyncReqMenuList }
)(MenuForm)
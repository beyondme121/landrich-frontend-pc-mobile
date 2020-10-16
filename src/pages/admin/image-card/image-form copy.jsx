import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Select, message } from 'antd';
import { asyncReqImageCards } from '../../../redux/actions/menu-action'
import { reqCreateImageCard } from '../../../api'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 8 },
};
// 分类标题样式
const dividerLayout = {
  margin: '10px 20px 20px',
  fontSize: '18px'
}

const { Item } = Form
const { Option } = Select;
const { TextArea } = Input;

function ImageForm(props) {
  const {
    menuList, imageCards,
    asyncReqImageCards, asyncReqMenuList
  } = props
  let [menuSelect, setMenuSelect] = useState('')

  useEffect(() => {
    if (imageCards.length > 0) {
      return
    }
    let fn = async () => {
      await asyncReqImageCards()
    }
    fn()
  }, [])

  const onCreateImageCard = () => {

  }

  const onFinish = async values => {
    console.log("value", values)
    let res = await reqCreateImageCard(values)
    if (res.code === 0) {
      message.success(`菜单${res.data.title}创建成功`)
      await asyncReqImageCards()
      // props.history.push('/admin/menu')
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // 选择一级菜单触发事件
  const onMenuClassTypeChange = (value) => {
    console.log(`selected ${value}`);
    setMenuSelect(value)
  }

  // 生成客户端一级菜单数据对象
  const NavMenuList = useMemo(() => {
    return menuList && menuList.filter(item => {
      return item.Type === 'client' && item.MenuPath.includes('/nav/')
    })
  }, [menuList])

  const NavMenuOptions = useMemo(() => {
    return NavMenuList && NavMenuList.map(item => (
      <Option value={item.MenuNameEN.toLowerCase()} key={item.MenuId}>{item.MenuNameEN.toLowerCase()}</Option>
    ))
  }, [NavMenuList])

  // 2. ======================================================================
  // 一级菜单与二级分类的映射关系 并去除重复值
  const menuMapping = useMemo(() => {
    let data = imageCards.filter(item => item.type !== null || item.class_type !== null)
    let obj = {}, str = '';
    let res = data && data.reduce((pre, item) => {
      str = item.class_type + item.type
      if (!obj[str]) {
        obj[str] = true
        pre.push({
          class_type: item.class_type,
          type: item.type
        })
      }
      return pre
    }, [])
    return res
  }, [imageCards])

  // 3. 生成二级分类的数据与VDOM ( 根据已经配置事实数据形成)
  // TODO 一级和二级菜单配置项 (暂时先这样做)
  const LevelTwoTab = useMemo(() => {
    return menuMapping && menuMapping.reduce((pre, item) => {
      if (item.class_type === menuSelect) {
        pre.push(
          <Option value={item.type.toLowerCase()} key={item.type}>{item.type.toLowerCase()}</Option>
        )
      }
      return pre
    }, [])
  }, [menuSelect, menuMapping])

  return (
    <Form
      {...layout}
      name="image-card"
      initialValues={{ Type: 'admin', AuthType: 'authorized' }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <div style={dividerLayout}>
        内容主题配置
      </div>
      <Item
        label="图片内容标题"
        name="title"
        rules={[{ required: true, message: '请输入内容名称' }]}
      >
        <Input />
      </Item>
      <Item
        label="图片相对路径"
        name="coverImg"
        rules={[{ required: true, message: '请输入图片路径' }]}
      >
        <Input />
      </Item>
      <Item
        label="一级分类"
        name="class_type"
        rules={[{ required: true, message: '请选择一级分类' }]}
      >
        <Select style={{ width: 200 }} onChange={onMenuClassTypeChange}>
          {NavMenuOptions}
        </Select>
      </Item>
      <Item
        label="二级分类"
        name="type"
        rules={[{ required: true, message: '请选择二级分类' }]}
      >
        <Select style={{ width: 200 }} >
          {LevelTwoTab}
        </Select>
      </Item>
      <Item
        label="首页分类"
        name="homepage_type"
      >
        <Select style={{ width: 200 }}>
          <Option value="news">news</Option>
          <Option value="shortcut">shortcut</Option>
        </Select>
      </Item>
      <div style={dividerLayout}>
        内容详情配置
      </div>
      <Item
        label="详情内容标题"
        name="detail-title"
      >
        <Input />
      </Item>
      <Item
        label="内嵌图片路径"
        name="imgURLS"
      >
        <TextArea
          placeholder="
            填写图片所在路径, 多张图片路径以英文逗号','进行分隔,例如:
            /images/atmos/Ph_6.png,/images/atmos/Ph_12.png,"
          autoSize={{ minRows: 4 }}
        />
      </Item>
      <Item
        label="排序字段"
        name="SortKey"
        wrapperCol={{ span: 4 }}
      >
        <Input type="number" />
      </Item>
      <Item {...tailLayout}>
        <Button type="primary" htmlType="submit">提交</Button>
      </Item>
    </Form>
  )
}

export default connect(
  state => ({
    menuList: state.menuList,
    imageCards: state.imageCards
  }),
  { asyncReqImageCards }
)(ImageForm)
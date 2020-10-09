import { reqMenuCards } from '../../api'
import { SAVE_MENUCARDS } from '../action-types'
// import { message } from 'antd'

// 保存card数据
const save_cards = (data) => ({ type: SAVE_MENUCARDS, data })

export const asyncReqMenuCards = () => {
  return async (dispatch) => {
    const { code, data } = await reqMenuCards()
    if (code === 0) {
      dispatch(save_cards(data))
    } else {
      // message.error(`查询数据失败`)
      console.log('查询数据失败')
    }
  }
}

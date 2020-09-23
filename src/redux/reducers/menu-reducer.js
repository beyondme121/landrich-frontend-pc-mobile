import { SAVE_MENUCARDS } from '../action-types'
let initMenuCards = []

function menuReducer(state = initMenuCards, action) {
  let { type, data } = action
  switch (type) {
    case SAVE_MENUCARDS:
      return {
        menu_cards: data,
      }
    default:
      return state
  }
}
export default menuReducer

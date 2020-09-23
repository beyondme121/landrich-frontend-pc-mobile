import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { serverStaticPath } from '../../config/config'
import { supporter } from '../../config/welcome-config'
import { asyncReqMenuCards } from '../../redux/actions/menu-action'
import Header from '../../components/header/header'
import Swiper from '../../components/swiper/swiper'
import ImageSection from '../../components/image-section/section'
import './home.less'

function HomeIndex(props) {
  const { asyncReqMenuCards, menuCards } = props

  const getSupportCrew = () => {
    let res = supporter.reduce((pre, item, index) => {
      pre.push(
        <div key={index} className="section-item">
          <div className="crew-base">
            <img src={serverStaticPath + item.imgSrc} alt={item.name} />
            <div className="crew-baseinfo">
              <strong className="crew-name">{item.name}</strong>
              <p className="crew-job-title">{item.title}</p>
            </div>
          </div>
          <p className="crew-job-desc">{item.desc}</p>
        </div>
      )
      return pre
    }, [])
    return res
  }

  useEffect(() => {
    // 如果没有请求明细数据, 拉取数据到redux中
    if (!menuCards) {
      const fn = async () => {
        await asyncReqMenuCards()
      }
      fn()
    }
  }, [])

  return (
    <div className="home-container">
      <Header />
      <Swiper />
      <ImageSection title="What's NEW" type="news" data={menuCards} />
      <ImageSection title="Shortcut" type="shortcut" data={menuCards} />
      <div className="crew">
        <h2 className="title">Support Crew</h2>
        <section className="section-wrapper">
          {getSupportCrew()}
        </section>
      </div>
    </div>
  )
}
export default connect(
  state => ({
    menuCards: state.menu.menu_cards
  }),
  { asyncReqMenuCards }
)(HomeIndex)
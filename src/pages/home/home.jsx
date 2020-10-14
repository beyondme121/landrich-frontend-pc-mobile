import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { serverStaticPath } from '../../config/config'
import { supporter } from '../../config/welcome-config'
import { asyncReqImageCards } from '../../redux/actions/menu-action'
import Swiper from '../../components/swiper/swiper'
import ImageSection from '../../components/image-section/section'
import { asyncReqMenuList } from '../../redux/actions/menu-action'
import './home.less'

function HomeIndex(props) {
  const { asyncReqImageCards, imageCards, asyncReqMenuList } = props

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
    if (imageCards.length === 0) {
      const fn = async () => {
        await asyncReqImageCards()
      }
      fn()
    }
  }, [imageCards, asyncReqImageCards])

  // 加载菜单数据
  useEffect(() => {
    let fn = async () => {
      await asyncReqMenuList()
    }
    fn()
  })

  return (
    <div className="home-container">
      <div className="welcome-info">
        This UNOFFICIAL Web shows some FCST Figs. Related Figs are WELCOME! :)
      </div>
      <Swiper />
      <ImageSection title="What's NEW" type="news" data={imageCards} />
      <ImageSection title="Shortcut" type="shortcut" data={imageCards} />
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
    imageCards: state.imageCards
  }),
  { asyncReqImageCards, asyncReqMenuList }
)(HomeIndex)
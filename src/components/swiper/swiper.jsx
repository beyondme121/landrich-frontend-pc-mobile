import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css'

import './index.less'
import { sliders } from '../../config/welcome-config'
import { serverStaticPath } from '../../config/config'


export default function SwiperWrapper(props) {
  const [count, setCount] = useState(0)
  // 生成轮播图
  const getSliderFromServer = () => {
    return sliders.map((item, index) => {
      return (
        <div className="swiper-slide" key={index}>
          <Link to={item.path} title={item.title} key={index}>
            <h2 className={count % 2 === 0 ? 'slider-even' : 'slider-odd'}>
              {item.title}
            </h2>
            <img src={serverStaticPath + item.imgSrc} />
          </Link>
        </div>
      )
    })
  }

  useEffect(() => {
    let swiper = new Swiper('.swiper-container', {
      spaceBetween: 0,
      centeredSlides: true,
      speed: 2000,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      loop: true,
      effect: 'coverflow',
      slidesPerView: 1,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      observer: true,
      observeParents: true,
      on: {
        init: function () {
        },
        slideChangeTransitionEnd: function () {
          setCount(count => count + 1)
        }
      }
    });
  }, [])

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        {getSliderFromServer()}
      </div>
      <div className="swiper-pagination"></div>
      {/* <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div> */}
      <div className="swiper-scrollbar"></div>
    </div>
  )
}

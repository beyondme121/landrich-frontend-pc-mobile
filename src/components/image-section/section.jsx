import React, { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { serverStaticPath } from '../../config/config'
import './section.less'

const Section = memo(function Section(props) {
  let { title, type, data, children } = props
  console.log(title, type, data, children)
  const renderSection = useMemo(() => {
    let result = data && data.filter(item => item.homepage_type === type)
    let res = result && result.reduce((pre, item, index) => {
      if (item.path) {
        if (item.path.startsWith('http')) {
          pre.push(
            <a href={item.path} key={index} className="section-item">
              <img src={serverStaticPath + item.coverImg} alt="" />
              {/* <div className="backdrop"></div> */}
              <p className="section-item-info">{item.title}</p>
              {children}
            </a>
          )
        } else if (item.path.startsWith('/')) {
          pre.push(
            <Link to={{
              pathname: item.path || '',
              state: { id: item.id }
            }} key={index} className="section-item">
              <img src={serverStaticPath + item.coverImg} alt="" />
              {/* <div className="backdrop"></div> */}
              <p className="section-item-info">{item.title}</p>
              {children}
            </Link>
          )
        }
      }
      return pre
    }, [])

    // 单纯把没有链接的拿出来放在数组的最后
    let noLinkRes = result && result.reduce((pre, item, index) => {
      if (!item.path) {
        pre.push(
          <Link to={item.path || ''} key={index} className="section-item">
            <img src={serverStaticPath + item.coverImg} alt="" />
            {/* <div className="backdrop"></div> */}
            <p className="section-item-info">{item.title}</p>
            {children}
          </Link>
        )
      }
      return pre
    }, [])

    let final = res && res.concat(noLinkRes)
    return final
  }, [title, type, data])


  return (
    <div className="content-wrapper">
      <h2 className="title">{title}</h2>
      <section className="section-wrapper">
        {renderSection}
      </section>
    </div>
  )
})
export default Section
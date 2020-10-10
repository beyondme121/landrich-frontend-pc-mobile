import React, { useState, useEffect } from 'react'
import { serverStaticPath } from '../../config/config'
import './image-detail.less'
import { reqMenuCardDetailById } from '../../api/index'

function ImageWrapper(props) {

  let { id } = props.history.location.state
  const [detail, setDetail] = useState('')

  useEffect(() => {
    const reqDetail = async () => {
      let r = await reqMenuCardDetailById(id)
      if (r.code === 0) {
        setDetail(r.data)
      }
    }
    reqDetail()
  }, [id])

  const resultDOM = () => {
    return detail && detail.map(item => {
      return (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <div className="image-container">
            {
              item.imgURLS.split(',').map((item, index) => (
                <div key={index}>
                  <img src={serverStaticPath + item} alt={item} />
                </div>
              ))
            }
          </div>
        </div>
      )
    })
  }

  return (
    <div className="detail-wrapper">
      {resultDOM()}
    </div>
  )
}

export default ImageWrapper
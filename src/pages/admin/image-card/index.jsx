import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ImageList from './image-list'
import ImageForm from './image-form'
import './index.less'

function ImageCard(props) {
  return (
    <Switch>
      <Route path="/admin/image/list" component={ImageList} />
      <Route path="/admin/image/form" component={ImageForm} />
      <Route to="/admin/image/list" />
    </Switch>
  )
}

export default ImageCard
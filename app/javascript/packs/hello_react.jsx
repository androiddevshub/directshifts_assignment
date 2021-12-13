// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './MainPage'
import DashboardPage from './DashboardPage';

const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Routes>
        <Route exact path="/" element={<MainPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
    </Routes>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})

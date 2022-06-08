/* eslint-disable */
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './components/app/App'
import { store, persistor } from './redux/store'
import 'antd/dist/antd.min.css'
import './index.css'

ReactDOM.render(
  <Router basename="/">
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </Router>,
  document.getElementById('root')
)

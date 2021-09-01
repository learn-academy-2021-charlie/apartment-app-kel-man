import React from "react"
import PropTypes from "prop-types"
import AppRouter from './components/AppRouter'
import AppContext from './context/AppContext'

const App = props => {
  return(
    <AppContext.Provider value={props}>
      <AppRouter/>
    </AppContext.Provider>
  )
}

export default App

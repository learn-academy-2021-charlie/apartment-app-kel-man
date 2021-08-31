import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Home from '../pages/Home'
import InvalidPath from '../pages/InvalidPath'
import ApartmentIndex from '../pages/Apartment/ApartmentIndex'
import { Button } from '@material-ui/core'
import axios from 'axios'

const AppRouter = () => {
  const logout = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      url: '/users/sign_out',
    }).then(() => (window.location = '/'))
  }

  return(
    <Router>
      <Button onClick={() => logout()}>Log out Button Heres More Text</Button>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path='/apartmentindex' component={ApartmentIndex}/>
        <Route component={InvalidPath}/>
      </Switch>
    </Router>
  )
}

export default AppRouter

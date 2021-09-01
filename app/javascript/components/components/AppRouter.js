import React, { useContext } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from 'react-router-dom'
import Home from '../pages/Home'
import InvalidPath from '../pages/InvalidPath'
import ApartmentIndex from '../pages/Apartment/ApartmentIndex'
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import AppContext from '../context/AppContext'
import NavBar from './NavBar'
import SignUp from '../pages/SignUp'

const styles = theme => ({
  buttons: {
    paddingLeft: '200px'
  },
  context: {
    padding: '100px'
  },
})

const AppRouter = ({classes}) => {
  const context = useContext(AppContext)

  const logOut = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: '/users/sign_out',
    })
      .then(() => (window.location = '/'))
      .catch((err) => console.log(err))
  }

  return(
    <Router className={classes.router}>
      <NavBar/>
      <Button onClick={() => console.log(context)} className={classes.context}>ContextLogger</Button>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path='/apartmentindex' component={ApartmentIndex}/>
        <Route path='/signup' component={SignUp}/>
        <Route component={InvalidPath}/>
      </Switch>
    </Router>
  )
}

export default withStyles(styles)(AppRouter)

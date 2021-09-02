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
import SignIn from '../pages/SignIn'
import NewApartmentForm from '../pages/NewApartmentForm'

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
      <Switch>
        {context.logged_in && <Route exact path="/" component={Home}/> }
        {!context.logged_in && <Route exact path="/" component={SignIn}/>}
        <Route path='/apartmentindex' component={ApartmentIndex}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/newapartmentform' component={NewApartmentForm}/>
        <Route component={InvalidPath}/>
      </Switch>
    </Router>
  )
}

export default withStyles(styles)(AppRouter)

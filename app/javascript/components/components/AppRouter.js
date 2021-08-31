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

const styles = theme => ({
  router: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center'
  },
  buttons: {
    paddingLeft: '200px'
  }
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
      <Button onClick={() => logOut()} className={classes.buttons}>Log out with custom function</Button>
      <Button onClick={() => {console.log(context)}} className={classes.buttons}>Click me for context</Button>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path='/apartmentindex' component={ApartmentIndex}/>
        <Route component={InvalidPath}/>
      </Switch>
    </Router>
  )
}

export default withStyles(styles)(AppRouter)

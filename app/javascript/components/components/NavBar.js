import React, { useContext, useEffect } from 'react'
import AppContext from '../context/AppContext'
import { Box, Button, CssBaseline, Typography, Drawer } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'

const styles = theme => ({
  container: {
    height: '50px',
    display: 'flex',
    flexFlow: 'row',
    background: '#004d40',
    justifyContent: 'space-between',
  },
  welcome: {
    alignSelf: 'center',
    justifySelf: 'flex-start',
    marginLeft: '20px',
    color: 'beige'
  },
  buttons: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    color: 'beige'
  },
})

const NavBar = ({ classes, history }) => {
  const context = useContext(AppContext)

  const logout = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: '/users/sign_out',
    }).then(() => (window.location = '/'))
  }

  const loggedIn = context.logged_in

  useEffect(() => {
    console.log(context)
    console.log(loggedIn)
  }, [])
  return (
    <>
      <Drawer variant="permanent" anchor="top">
        <Box className={classes.container}>
          {loggedIn && <Typography className={classes.welcome}>Welcome, {context.current_user.email}</Typography>}
          {!loggedIn && <div />}
          <div className={classes.buttons}>
            {!loggedIn && (
              <>
                <Button color="inherit" edge="start" onClick={() => history.push('/')}>
                  Home
                </Button>
              </>
            )}
            <>
              <Button color="inherit" edge="start" onClick={() => history.push('/apartmentindex')}>
                See all listings
              </Button>
            </>
            {loggedIn && (
              <>
                <Button color="inherit" edge="start" onClick={() => history.push('/')}>
                  Home
                </Button>
              </>
            )}
            {loggedIn && (
              <Button color="inherit" onClick={() => history.push('/apartments/new')}>
                Add new listing!
              </Button>
            )}
            {!loggedIn && (
              <>
                <Button color="inherit" onClick={() => history.push('/signup')}>
                  Sign Up
                </Button>
                <Button color="inherit" edge="end" variant="outlined" onClick={() => history.push('/signin')}>
                  Log-in
                </Button>
              </>
            )}
            {loggedIn && (
              <>
                <Button color="inherit" onClick={logout}>
                  Log Out
                </Button>
              </>
            )}
          </div>
        </Box>
      </Drawer>
    </>
  )
}

export default withStyles(styles)(withRouter(NavBar))

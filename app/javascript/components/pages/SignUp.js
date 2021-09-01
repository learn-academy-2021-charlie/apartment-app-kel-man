import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        github.com/kel-man
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignUp = ({history}) => {
  const classes = useStyles();
  const [inputs, setInputs] = useState({})

  const inputChange = e => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    const data = { ...inputs }
    data.password_confirmation = inputs.password
    axios({
      headers: {
        contentType: 'application/json',
      },
      method: 'POST',
      url: '/users',
      data: {
        user: data,
      },
    })
      .then(response => {
        history.push('/')
      })
      .catch(error => {console.log(error)})
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}> */}
            {/*   <TextField */}
            {/*     autoComplete="fname" */}
            {/*     name="firstName" */}
            {/*     variant="outlined" */}
            {/*     required */}
            {/*     fullWidth */}
            {/*     id="firstName" */}
            {/*     label="First Name" */}
            {/*     autoFocus */}
            {/*   /> */}
            {/* </Grid> */}
            {/* <Grid item xs={12} sm={6}> */}
            {/*   <TextField */}
            {/*     variant="outlined" */}
            {/*     required */}
            {/*     fullWidth */}
            {/*     id="lastName" */}
            {/*     label="Last Name" */}
            {/*     name="lastName" */}
            {/*     autoComplete="lname" */}
            {/*   /> */}
            {/* </Grid> */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={inputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={inputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => (window.location='/signin')}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default withRouter(SignUp)

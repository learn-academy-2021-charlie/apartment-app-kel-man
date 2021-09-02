import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import {
  Container,
  CssBaseline,
  TextField,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Button,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  mainContainer: {
    marginTop: '50px'
  },
}))

const NewApartmentForm = () => {
  const classes = useStyles()
  const [inputs, setInputs] = useState({})
  const [activeStep, setActiveStep] = React.useState(0);

  const inputChange = e => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const submitNew = e => {
    e.preventDefault()
    const data = JSON.parse(JSON.stringify({...inputs}))
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      url: '/apartments',
      data: {
        apartment: data,
      },
    })
      .then(response => {
        window.location = '/apartmentindex'
      })
      .catch(err => {
        console.log(err)
        alert("Check required fields!")
        setActiveStep(0)
      })
  }

  const getSteps = () => {
    return [
      'Enter Street Address',
      'Enter City',
      'Enter State',
      'Enter Property Manager',
      'Enter Contact email',
      'Enter Price',
      'Enter Bedrooms(optional)',
      'Enter Bathrooms(optional)',
      'Enter Pet Policy(optional)'
    ]
  }
  const steps = getSteps();

  const getCurrentInput = step => {
    switch (step) {
      case 0:
        return (
          <TextField
            margin="normal"
            required
            fullWidth
            id="street"
            label="Street Address"
            name="street"
            autoFocus
            onChange={inputChange}
          />
        )
      case 1:
        return (
          <TextField
            margin="normal"
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            autoFocus
            onChange={inputChange}
          />
        )
      case 2:
        return (
          <TextField
            margin='normal'
            required
            fullWidth
            id='state'
            label='State'
            name='state'
            autoFocus
            onChange={inputChange}
          />
        )
      case 3:
        return (
          <TextField
            margin='normal'
            required
            fullWidth
            id='manager'
            label='Property Manager'
            name='manager'
            autoFocus
            onChange={inputChange}
          />
        )
      case 4:
        return (
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Contact email'
            name='email'
            autoFocus
            onChange={inputChange}
          />
        )
      case 5:
        return (
          <TextField
            margin='normal'
            required
            fullWidth
            id='price'
            label='Apartment Price'
            name='price'
            autoFocus
            onChange={inputChange}
          />
        )
      case 6:
        return (
          <TextField
            margin='normal'
            fullWidth
            id='bedrooms'
            label='Number of bedrooms(optional)'
            name='bedrooms'
            autoFocus
            onChange={inputChange}
          />
        )
      case 7:
        return (
          <TextField
            margin='normal'
            fullWidth
            id='bathrooms'
            label='Number of bathrooms(optional)'
            name='bedrooms'
            autoFocus
            onChange={inputChange}
          />
        )
      case 8:
        return (
          <TextField
            margin='normal'
            fullWidth
            id='pets'
            label='Pet Policy for this apartment(optional)'
            name='pets'
            autoFocus
            onChange={inputChange}
          />
        )
      default:
        return 'Unknown step'
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  }

  return(
    <Container component="main" className={classes.mainContainer}>
      <CssBaseline/>
      <Typography>
        Create your own listing!
      </Typography>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel onClick={() => setActiveStep(index)}>{label}</StepLabel>
              <StepContent>
                <Typography component={'span'}>{getCurrentInput(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
            <Button onClick={submitNew} className={classes.button}>
              Post this apartment!
            </Button>
          </Paper>
        )}
    </Container>
  )
}

export default NewApartmentForm

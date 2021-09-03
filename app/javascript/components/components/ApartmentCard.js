import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppContext from '../context/AppContext'
import {
  Card,
  CardActions,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography
} from '@material-ui/core/'
import axios from 'axios'

const styles = theme => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

const ApartmentCard = ({classes, street, city, state, manager, email, price, bedrooms, bathrooms, pets, id, user_id }) => {
  const context = useContext(AppContext)

  const deleteApartment = () => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      url: `/apartments/${id}`,
    })
      .then(response => {
        window.location = '/apartmentindex'
      })
      .catch(err => {
        console.log(err)
        alert("Failed to delete")
      })
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Accordion>
          <AccordionSummary>
            <Typography className={classes.title} color="primary" gutterBottom>
              Address: {street}, {city}, {state}.
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" component="p">
              Manager: {manager}
              <br />
              Contact manager: {email}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              {price}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              {bedrooms} bedroom,
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              {bathrooms} bathroom.
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            <Typography>
              {pets}
            </Typography>
          </AccordionDetails>
          <AccordionDetails>
            {context.current_user.id === user_id && (
              <CardActions>
                <Button color="primary" size="small" onClick={() => window.location = `/editapartment/${id}`}>Edit</Button>
                <Button color="secondary" size="small" onClick={deleteApartment}>DELETE</Button>
              </CardActions>
            )}
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ApartmentCard)

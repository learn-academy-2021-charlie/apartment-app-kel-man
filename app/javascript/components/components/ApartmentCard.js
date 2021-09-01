import React from 'react'
import { withStyles } from '@material-ui/core/styles'
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

const ApartmentCard = ({classes, street, city, state, manager, email, price, bedrooms, bathrooms, pets }) => {

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
        </Accordion>
      </CardContent>
      {/* <CardActions> */}
      {/*   <Button size="small">Learn More</Button> */}
      {/* </CardActions> */}
    </Card>
  );
}

export default withStyles(styles)(ApartmentCard)

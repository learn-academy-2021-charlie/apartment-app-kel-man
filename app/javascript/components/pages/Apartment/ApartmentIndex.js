import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { List, ListItem, ListItemText } from '@material-ui/core'

const ApartmentIndex = () => {
  const [apartments, setApartments] = useState([])
  useEffect(() => {
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: '/apartments'
    })
      .then(response => {
        setApartments(response.data.apartments)
        console.log(response.data)
      })
      .catch(error => {
        alert(error)
      })
  }, [])

  return(
    <>
      <h2>All apartment listings</h2>
      <List>
        {apartments && apartments.map((apt) => {
          return(
            <ListItem key={apt.id}>
              <ListItemText>{apt.street}</ListItemText>
              <ListItemText>{apt.city}</ListItemText>
              <ListItemText>{apt.state}</ListItemText>
              <ListItemText>{apt.manager}</ListItemText>
              <ListItemText>{apt.email}</ListItemText>
              <ListItemText>{apt.price}</ListItemText>
              <ListItemText>{apt.bedrooms}</ListItemText>
              <ListItemText>{apt.bathrooms}</ListItemText>
              <ListItemText>{apt.pets}</ListItemText>
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default ApartmentIndex

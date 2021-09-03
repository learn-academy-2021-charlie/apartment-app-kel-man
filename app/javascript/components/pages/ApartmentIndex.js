import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { List } from '@material-ui/core'
import ApartmentCard from '../components/ApartmentCard'

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
        console.log(error)
      })
  }, [])

  return(
    <>
      <h2>All apartment listings</h2>
      <List>
        {apartments && apartments.map((apt) => {
          return(
            <ApartmentCard
            key={apt.id}
            street={apt.street}
            city={apt.city}
            state={apt.state}
            manager={apt.manager}
            email={apt.email}
            price={apt.price}
            bedrooms={apt.bedrooms}
            bathrooms={apt.bathrooms}
            pets={apt.pets}
            user_id={apt.user_id}
            id={apt.id}/>
          )
        })}
      </List>
    </>
  )
}

export default ApartmentIndex

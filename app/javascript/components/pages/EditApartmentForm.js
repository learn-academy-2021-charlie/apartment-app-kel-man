import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TextField,
  CssBaseline,
  Container,
  Button
} from '@material-ui/core'

const EditApartmentForm = ({match}) => {
  const [apartment, setApartment] = useState({})
  useEffect(() => {
    console.log('rendering edit')
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
      url: `/apartments/${match.params.id}`,
    })
      .then(response => {
        setApartment(response.data)
        console.log(response.data)
      })
      .catch(err => console.log(err))
  }, [])

  const submitEdit = e => {
    e.preventDefault()
    const data = JSON.parse(JSON.stringify({...apartment}))
    axios({
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      url: `/apartments/${apartment.id}`,
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
      })
  }

  const inputChange = e => {
    const { name, value } = e.target
    setApartment({ ...apartment, [name]: value })
  }

  return(
    <Container component="main">
      <h2>Edit this listing</h2>
      <form>
        {apartment.street && (
          <>
            <TextField
            margin="normal"
            defaultValue={apartment.street}
            required
            fullWidth
            id="street"
            label="Street Address"
            name="street"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.city}
            required
            fullWidth
            id="city"
            label="City"
            name="city"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.state}
            required
            fullWidth
            id="state"
            label="State"
            name="state"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.manager}
            required
            fullWidth
            id="manager"
            label="Manager"
            name="manager"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.email}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.price}
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.bedrooms}
            fullWidth
            id="bedrooms"
            label="Bedrooms"
            name="bedrooms"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.bathrooms}
            fullWidth
            id="bathrooms"
            label="Bathrooms"
            name="bathrooms"
            onChange={inputChange}
            />
            <TextField
            margin="normal"
            defaultValue={apartment.pets}
            fullWidth
            id="pets"
            label="Pet Policy"
            name="pets"
            onChange={inputChange}
            />
          </>
        ) }
        <Button onClick={submitEdit}>Submit your edit</Button>
      </form>
    </Container>
  )
}

export default EditApartmentForm

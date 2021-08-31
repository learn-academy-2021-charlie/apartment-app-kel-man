import React from 'react'
import { Switch, Route } from 'react-router-dom'

const Apartment = () => {
  return(
    <>
      <h2>Apartments</h2>
      <Switch>
        <Route path='/apartments' component={ApartmentIndex}/>
      </Switch>
    </>
  )
}

export default Apartment

import React from 'react'
import { Button } from 'reactstrap'

const Home = ({history}) => {
  return(
    <>
      <Button onClick={() => history.push('/testview')}>Here's a button</Button>
    </>
  )
}

export default Home

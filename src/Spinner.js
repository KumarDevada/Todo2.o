import React from 'react'

const Spinner = (props) => {
  return (
    <div className='spinner'><div class="lds-dual-ring"></div><br /><h3>{props.text}</h3></div>
  )
}

export default Spinner
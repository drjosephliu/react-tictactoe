import React from 'react';

const Square = (props) => {
  return (
    <div className='square' onClick={props.onClick}>
      {props.value}
    </div>
  )
}

export default Square;

import React from 'react';

const SelectButton = (props) => {
  const { onClick, selectedTurn, value } = props;
  return (
    <div
      className='select-button'
      onClick={onClick}
      style={{ border: selectedTurn == value ? '4px solid black' : '' }}
    >
      {value}
    </div>
  )
}

export default SelectButton;

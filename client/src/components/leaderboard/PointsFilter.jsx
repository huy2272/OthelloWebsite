import React from 'react';
import './PointsFilter.css';

const PointsFilter = (props) => {


  function dropdownChangeHandler(event) {
    props.onChangeFilter(event.target.value)
  };
  return (
    <div className='points-filter'>
      <div className='points-filter__control'>
        <label>Filter by points</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value='40'>40</option>
          <option value='30'>30</option>
          <option value='20'>20</option>
          <option value='10'>10</option>
          <option value='0'>0</option>
        </select>
      </div>
    </div>
  );
};

export default PointsFilter;
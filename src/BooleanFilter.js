// src/filters/BooleanFilter.js
import React, { useState } from 'react';

const BooleanFilter = ({ onFilter }) => {
  const [filterType, setFilterType] = useState('equals');
  const [value, setValue] = useState('true');

  const handleFilter = () => {
    onFilter(filterType, value === 'true');
  };

  return (
    <div>
      <select onChange={(e) => setFilterType(e.target.value)}>
        <option value='equals'>Equals</option>
        <option value='isNull'>Is null</option>
        <option value='isNotNull'>Is not null</option>
      </select>
      <select onChange={(e) => setValue(e.target.value)}>
        <option value='true'>True</option>
        <option value='false'>False</option>
      </select>
      <button onClick={handleFilter}>Apply</button>
    </div>
  );
};

export default BooleanFilter;

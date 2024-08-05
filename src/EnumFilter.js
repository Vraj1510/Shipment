// src/filters/EnumFilter.js
import React, { useState } from 'react';

const EnumFilter = ({ options, onFilter }) => {
    const [filterType, setFilterType] = useState('equals');
    const [value, setValue] = useState('');

    const handleFilter = () => {
        onFilter(filterType, value);
    };

    return (
        <div>
            <select onChange={(e) => setFilterType(e.target.value)}>
                <option value="equals">Equals</option>
                <option value="notEqual">Not equal</option>
                <option value="in">In</option>
                <option value="notIn">Not in</option>
                <option value="isNull">Is null</option>
                <option value="isNotNull">Is not null</option>
            </select>
            <select onChange={(e) => setValue(e.target.value)}>
                {options.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
            <button onClick={handleFilter}>Apply</button>
        </div>
    );
};

export default EnumFilter;

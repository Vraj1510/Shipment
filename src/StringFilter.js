// src/filters/StringFilter.js
import React, { useState } from 'react';

const StringFilter = ({ onFilter }) => {
    const [filterType, setFilterType] = useState('contains');
    const [value, setValue] = useState('');

    const handleFilter = () => {
        onFilter(filterType, value);
    };

    return (
        <div>
            <select onChange={(e) => setFilterType(e.target.value)}>
                <option value="contains">Contains</option>
                <option value="notContains">Not contains</option>
                <option value="equals">Equals</option>
                <option value="notEqual">Not equal</option>
                <option value="startsWith">Starts with</option>
                <option value="endsWith">Ends with</option>
                <option value="isNull">Is null</option>
                <option value="isNotNull">Is not null</option>
            </select>
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={handleFilter}>Apply</button>
        </div>
    );
};

export default StringFilter;

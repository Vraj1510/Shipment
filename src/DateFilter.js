// src/filters/DateFilter.js
import React, { useState } from 'react';

const DateFilter = ({ onFilter }) => {
    const [filterType, setFilterType] = useState('equals');
    const [value, setValue] = useState('');
    const [range, setRange] = useState({ start: '', end: '' });

    const handleFilter = () => {
        onFilter(filterType, value, range);
    };

    return (
        <div>
            <select onChange={(e) => setFilterType(e.target.value)}>
                <option value="equals">Equals</option>
                <option value="dateRange">Date range</option>
                <option value="lessThan">Less than</option>
                <option value="lessThanOrEqual">Less than or equal</option>
                <option value="greaterThan">Greater than</option>
                <option value="greaterThanOrEqual">Greater than or equal</option>
                <option value="notEqual">Not equal</option>
                <option value="isNull">Is null</option>
                <option value="isNotNull">Is not null</option>
            </select>
            {filterType === 'dateRange' ? (
                <>
                    <input type="date" placeholder="Start Date" onChange={(e) => setRange({ ...range, start: e.target.value })} />
                    <input type="date" placeholder="End Date" onChange={(e) => setRange({ ...range, end: e.target.value })} />
                </>
            ) : (
                <input type="date" value={value} onChange={(e) => setValue(e.target.value)} />
            )}
            <button onClick={handleFilter}>Apply</button>
        </div>
    );
};

export default DateFilter;

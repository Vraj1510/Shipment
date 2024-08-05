import React, { useState } from 'react';
import mockData from '../MockData/data';
import IntegerFilter from '../IntegerFilter';
import StringFilter from '../StringFilter';
import DateFilter from '../DateFilter';
import EnumFilter from '../EnumFilter';
import BooleanFilter from '../BooleanFilter';

const DataTable = () => {
  const [data, setData] = useState(mockData);
  const [filters, setFilters] = useState({});
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' or 'desc'

  const handleFilterChange = (column, filterType, value, range) => {
    setFilters({ ...filters, [column]: { filterType, value, range } });
  };
   const handleSearchChange = (column, value) => {
     handleFilterChange(column, 'contains', value);
   };
const applyFilters = (data) => {
  let filteredData = [...data];

  Object.keys(filters).forEach((column) => {
    const { filterType, value, range } = filters[column];
    filteredData = filteredData.filter((item) => {
      const itemValue = item[column];

      // Convert itemValue and value to numbers for numeric comparisons
      const numericItemValue = typeof itemValue === 'number' ? itemValue : parseFloat(itemValue);
      const numericValue = parseFloat(value);

      switch (filterType) {
        case 'equals':
          return numericItemValue === numericValue;
        case 'lessThan':
          return numericItemValue < numericValue;
        case 'lessThanOrEqual':
          return numericItemValue <= numericValue;
        case 'greaterThan':
          return numericItemValue > numericValue;
        case 'greaterThanOrEqual':
          return numericItemValue >= numericValue;
        case 'range':
          return numericItemValue >= range.min && numericItemValue <= range.max;
        case 'notEqual':
          return numericItemValue !== numericValue;
        case 'contains':
          return typeof itemValue === 'string' && itemValue.includes(value);
        case 'notContains':
          return typeof itemValue === 'string' && !itemValue.includes(value);
        case 'startsWith':
          return typeof itemValue === 'string' && itemValue.startsWith(value);
        case 'endsWith':
          return typeof itemValue === 'string' && itemValue.endsWith(value);
        case 'isNull':
          return itemValue === null;
        case 'isNotNull':
          return itemValue !== null;
        case 'dateRange':
          return (
            new Date(itemValue) >= new Date(range.start) &&
            new Date(itemValue) <= new Date(range.end)
          );
        case 'in':
          return value.includes(itemValue);
        case 'notIn':
          return !value.includes(itemValue);
        default:
          return true;
      }
    });
  });

  if (sortColumn) {
    filteredData.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  return filteredData;
};


  const handleSortChange = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Filters</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <div>
            <h3 className='font-semibold mb-2'>ID</h3>
            <IntegerFilter
              onFilter={(filterType, value, range) =>
                handleFilterChange('id', filterType, value, range)
              }
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Name</h3>
            <StringFilter
              onFilter={(filterType, value) => handleFilterChange('name', filterType, value)}
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Age</h3>
            <IntegerFilter
              onFilter={(filterType, value, range) =>
                handleFilterChange('age', filterType, value, range)
              }
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Role</h3>
            <StringFilter
              onFilter={(filterType, value) => handleFilterChange('role', filterType, value)}
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Hire Date</h3>
            <DateFilter
              onFilter={(filterType, value, range) =>
                handleFilterChange('hireDate', filterType, value, range)
              }
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Active</h3>
            <BooleanFilter
              onFilter={(filterType, value) => handleFilterChange('isActive', filterType, value)}
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Salary</h3>
            <IntegerFilter
              onFilter={(filterType, value, range) =>
                handleFilterChange('salary', filterType, value, range)
              }
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Department</h3>
            <StringFilter
              onFilter={(filterType, value) => handleFilterChange('department', filterType, value)}
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Projects Completed</h3>
            <IntegerFilter
              onFilter={(filterType, value, range) =>
                handleFilterChange('projectsCompleted', filterType, value, range)
              }
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Last Login</h3>
            <DateFilter
              onFilter={(filterType, value, range) =>
                handleFilterChange('lastLogin', filterType, value, range)
              }
            />
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Access Level</h3>
            <EnumFilter
              options={['Admin', 'User']}
              onFilter={(filterType, value) => handleFilterChange('accessLevel', filterType, value)}
            />
          </div>
        </div>
      </div>
      <button
        className='bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600'
        onClick={() => setData(applyFilters(mockData))}
      >
        Apply Filters
      </button>
      <button
        className='bg-blue-500 text-white py-2  ml-4 px-4 rounded mt-4 hover:bg-blue-600'
        onClick={() => {
          setData(mockData);
          setSortColumn(null);
        }}
      >
        Reset
      </button>
      {data.length > 0 ? (
        <table className='min-w-full mt-4 bg-white border border-gray-200'>
          <thead>
            <tr className='bg-gray-200'>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('id')}
              >
                ID {sortColumn === 'id' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('name')}
              >
                Name {sortColumn === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('age')}
              >
                Age {sortColumn === 'age' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('role')}
              >
                Role {sortColumn === 'role' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('hireDate')}
              >
                Hire Date {sortColumn === 'hireDate' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('isActive')}
              >
                Active {sortColumn === 'isActive' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('salary')}
              >
                Salary {sortColumn === 'salary' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('department')}
              >
                Department{' '}
                {sortColumn === 'department' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('projectsCompleted')}
              >
                Projects Completed{' '}
                {sortColumn === 'projectsCompleted' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('lastLogin')}
              >
                Last Login {sortColumn === 'lastLogin' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                className='p-2 cursor-pointer hover:bg-gray-300'
                onClick={() => handleSortChange('accessLevel')}
              >
                Access Level{' '}
                {sortColumn === 'accessLevel' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
            <tr className='bg-gray-100'>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search ID'
                  onChange={(e) => handleSearchChange('id', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Name'
                  onChange={(e) => handleSearchChange('name', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Age'
                  onChange={(e) => handleSearchChange('age', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Role'
                  onChange={(e) => handleSearchChange('role', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Hire Date'
                  onChange={(e) => handleSearchChange('hireDate', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Active'
                  onChange={(e) => handleSearchChange('isActive', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Salary'
                  onChange={(e) => handleSearchChange('salary', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Department'
                  onChange={(e) => handleSearchChange('department', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Projects Completed'
                  onChange={(e) => handleSearchChange('projectsCompleted', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Last Login'
                  onChange={(e) => handleSearchChange('lastLogin', e.target.value)}
                />
              </th>
              <th className='p-2'>
                <input
                  type='text'
                  className='w-full p-1'
                  placeholder='Search Access Level'
                  onChange={(e) => handleSearchChange('accessLevel', e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className='border-t border-gray-200 hover:bg-gray-100'>
                <td className='p-2'>{item.id}</td>
                <td className='p-2'>{item.name}</td>
                <td className='p-2'>{item.age}</td>
                <td className='p-2'>{item.role}</td>
                <td className='p-2'>{item.hireDate}</td>
                <td className='p-2'>{item.isActive ? 'Yes' : 'No'}</td>
                <td className='p-2'>{item.salary}</td>
                <td className='p-2'>{item.department}</td>
                <td className='p-2'>{item.projectsCompleted}</td>
                <td className='p-2'>{item.lastLogin}</td>
                <td className='p-2'>{item.accessLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='mt-4'>No data available.</p>
      )}
    </div>
  );
};

export default DataTable;

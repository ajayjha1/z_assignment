import React, { useEffect, useState } from 'react';
import { generateUsers } from './generateUsers';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'


export const CarAgePieChart = () => {
  const [users, setUsers] = useState([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);

  const navigate = useNavigate();
  const navigateToVirtualizedList = () =>{
    navigate('/VirtualizedList')
  }
  useEffect(() => {
    setUsers(generateUsers(1000));
  }, []);

  const countByAge = {};
  const filteredUsers = selectedAgeRange ? users.filter(user => user.age >= selectedAgeRange[0] && user.age <= selectedAgeRange[1]) : users;
  
  filteredUsers.forEach((user) => {
    const age = user.vehicle.age;
    countByAge[age] = countByAge[age] ? countByAge[age] + 1 : 1;
  });

  const data = {
    labels: Object.keys(countByAge),
    datasets: [
      {
        label: 'Car Age',
        data: Object.values(countByAge),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8B0000', '#9400D3', '#008080', '#FFA07A', '#B8860B', '#708090', '#8FBC8F', '#483D8B'],
      },
    ],
  };

  const handleAgeRangeChange = (e) => {
    const [minAge, maxAge] = e.target.value.split('-');
    setSelectedAgeRange([Number(minAge), Number(maxAge)]);
  }

  return (
    <div>
      <label>
        Filter by age range:
        <select onChange={handleAgeRangeChange}>
          <option value="">All ages</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="56-65">56-65</option>
        </select>
      </label>
      <Pie data={data} />
      <button className='button' onClick={navigateToVirtualizedList}>Next</button>
    </div>
  )
}

import React, { useEffect, useState } from 'react';
import { generateUsers } from './generateUsers';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom'


export const PieChartByMaker = () => {
  const [users, setUsers] = useState([]);
  const [ageRange, setAgeRange] = useState(null);

  const navigate = useNavigate();

  const navigateToCarAgePieChart = () =>{
    navigate('/CarAgePieChart');
  }

  useEffect(() => {
    setUsers(generateUsers(1000));
  }, []);

  const countByMaker = {};
  const filteredUsers = ageRange ? users.filter(user => user.age >= ageRange[0] && user.age <= ageRange[1]) : users;
  filteredUsers.forEach((user) => {
    const maker = user.vehicle.make;
    countByMaker[maker] = countByMaker[maker] ? countByMaker[maker] + 1 : 1;
  });
  
  const data = {
    labels: Object.keys(countByMaker),
    datasets: [
      {
        label: 'Cars by Maker',
        data: Object.values(countByMaker),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FFA07A',
          '#C71585',
          '#32CD32',
        ],
      },
    ],
  };

  const handleAgeRangeChange = (event) => {
    const selectedAgeRange = event.target.value;
    if (selectedAgeRange === 'all') {
      setAgeRange(null);
    } else {
      const [minAge, maxAge] = selectedAgeRange.split('-').map(Number);
      setAgeRange([minAge, maxAge]);
    }
  };

  return (
    <>
      <div>
        Filter by Age:
        <select value={ageRange ? `${ageRange[0]}-${ageRange[1]}` : 'all'} onChange={handleAgeRangeChange}>
          <option value="all">All</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46-55">46-55</option>
          <option value="56-65">56-65</option>
        </select>
      </div>
      <Pie data={data} />
      <button className='button' onClick={navigateToCarAgePieChart}>Next</button>
    </>
  )
}

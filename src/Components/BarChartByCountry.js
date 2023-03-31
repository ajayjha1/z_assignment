import React, { useEffect, useState } from 'react';
import { generateUsers } from './generateUsers';
import { useNavigate } from 'react-router-dom'
import { Bar } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import Chart from 'chart.js/auto';
Chart.register(CategoryScale);



export const BarChartByCountry = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setUsers(generateUsers(1000));
  }, []);

   const navigateToPieChartByMaker = () =>{
    navigate('/PieChartByMaker')
   }

  const countByCountry = {};
  users.forEach((user) => {
    const country = user.country;
    countByCountry[country] = countByCountry[country] ? countByCountry[country] + 1 : 1;
  });

  const data = {
    labels: Object.keys(countByCountry),
    datasets: [
      {
        label: 'Users by Country',
        data: Object.values(countByCountry),
        backgroundColor: '#4caf50',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          type: 'category',
          ticks: {
            autoSkip: false,
          },
        },
      ],
    },
  };

  return (
    <>
      <Bar data={data} options={options} />
      <button className='button' onClick={navigateToPieChartByMaker}>Next</button>
    </>
  )
};

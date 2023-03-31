import {faker} from '@faker-js/faker'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export const generateUsers = (count) => {
    const users = [];
    for (let i = 1; i <= count; i++) {
      const address = `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}, ${faker.address.country()}`;
      const user = {
        id: faker.datatype.uuid(),
      username: faker.internet.userName(),
      address: faker.address.streetAddress(),
      age: faker.datatype.number({ min: 18, max: 65 }),
      phone: faker.phone.phoneNumber(),
      occupation: faker.name.jobTitle(),
      vehicle:{make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        age: faker.datatype.number({ min: 1, max: 10 })
      },
      country: faker.address.country(),
      };
      users.push(user);
    }
    return users;
  };
import React, {useState, useEffect} from 'react'
import { generateUsers } from './generateUsers';
import { useNavigate } from 'react-router-dom'


export const CarList = () => {
    const [users, setUsers] = useState(null);
    const [usersCopy, setUsersCopy] = useState(null);
    const [carsList, setCarsList] = useState([]);
    const [isBool, setIsBool] = useState(false)
    const arr = [];
    useEffect(() =>{
        setUsers(generateUsers(1000));
        arr.push(generateUsers(1000));
        const extractedCars = arr[0].map(user => user?.vehicle);
        const uniqueCars = Array.from(new Set(extractedCars.map(car => car?.make + car?.model)))
        .map(uniqueMakeModel => extractedCars.find(car => car?.make + car?.model === uniqueMakeModel));
        setCarsList(uniqueCars)
    },[]);

    const handleOpenUsers = (carMake, carModel) => {
        const filteredUsers = users.filter(user => user.vehicle.make === carMake && user.vehicle.model === carModel);
        setUsersCopy(filteredUsers);
        setIsBool(true);
      };

  return (
    <div style={{display: 'flex'}}>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Car Model</th>
                    <th>Car Maker</th>
                    <th>Button</th>
                </tr>
            </thead>
            <tbody>
                {
                    carsList?.map((carsList)=>{
                        return(
                        <tr>
                            <td>{carsList?.model}</td>
                            <td>{carsList?.make}</td>
                            <td><button onClick={() => handleOpenUsers(carsList?.make, carsList?.model)}>Open users</button></td>
                        </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        {isBool&&
        <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Country</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Vehicle</th>
                </tr>
            </thead>
            <tbody>
                
                {
                    usersCopy?.map((usersCopy)=>{
                        return(
                            <tr>
                                <td>{usersCopy?.username}</td>
                                <td>{usersCopy?.address}</td>
                                <td>{usersCopy?.country}</td>
                                <td>{usersCopy?.age}</td>
                                <td>{usersCopy?.phone}</td>
                                <td>
                                    Maker-{usersCopy?.vehicle?.make}<br/>
                                    Model-{usersCopy?.vehicle?.model}<br/>
                                    Age-{usersCopy?.vehicle?.age}<br/>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
        </div>
        }
    </div>
  )
}

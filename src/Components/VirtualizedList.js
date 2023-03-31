import React, { useState, useEffect } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import { generateUsers } from './generateUsers';
import { useNavigate } from 'react-router-dom'


export const VirtualizedList = () => {
    const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  useEffect(() => {
    setUsers(generateUsers(1000));
  }, []);

  const navigate = useNavigate()
  const navigateToCarList = () =>{
    navigate('/CarList')
  }

  const handleClick = (user) => {
    setSelectedUser(user);
  };

  const rowRenderer = ({ key, index, style }) => {
    const user = users[index];
    return (
      <div key={key} style={style}>
        <div onClick={() => handleClick(user)}>
            <table border={1}>
                <tbody>
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.age}</td>
                    </tr>
                </tbody>
            </table>
             </div>
      </div>
    );
  };

  const renderDetails = () => {
    if (!selectedUser) {
      return null;
    }

    const { username, age, phone, occupation, vehicle, address } = selectedUser;
    return (
      <div>
        <h2>{username} ({age})</h2>
        <p>Phone: {phone}</p>
        <p>Occupation: {occupation}</p>
        <p>Address: {address}</p>
        <p>Vehicle:</p>
        <ul>
          <li>Make: {vehicle?.make}</li>
          <li>Model: {vehicle?.model}</li>
          <li>Age: {vehicle?.age}</li>
        </ul>
      </div>
    );
  };

  return (
    <>
    <div style={{ display: 'flex', height: "100%" }}>
      <div style={{ width: '40%', borderRight: '1px solid black' }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={800}
              width={500}
              rowCount={users.length}
              rowHeight={50}
              rowRenderer={rowRenderer}
            />
          )}
        </AutoSizer>
      </div>
      <div style={{ paddingLeft:'60px', width: '70%', padding: '30px' }}>{renderDetails()}</div>
    </div>
    <button className='button float_right_button' onClick={navigateToCarList}>Next</button>
    </>
  );
};



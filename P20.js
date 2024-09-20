import React, { useState } from 'react';
import AddUser from './components/AddUser';
import DisplayUsers from './components/DisplayUsers';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <div style={{ display: 'flex' }}>
        <AddUser addUser={addUser} />
        <DisplayUsers users={users} />
      </div>
    </div>
  );
}

export default App;


import React, { useState } from 'react';

const AddUser = ({ addUser }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData);
    setFormData({
      firstName: '',
      lastName: '',
      country: '',
      phoneNumber: ''
    });
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddUser;

import React from 'react';

const DisplayUsers = ({ users }) => {
  return (
    <div>
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users added yet</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.firstName} {user.lastName}, {user.country} - {user.phoneNumber}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayUsers;

.App {
  text-align: center;
  padding: 20px;
}

input {
  margin: 5px;
  padding: 8px;
  width: 200px;
}

button {
  margin: 5px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

// UserDetails.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UserDetails = () => {
  const { id } = useParams(); // Get user id from the route parameters
  const users = useSelector((state) => state.users); // Fetch users from Redux store

  const user = users.find((u) => u.id === parseInt(id)); // Find the user based on id

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>First Name:</strong> {user.firstName}</p>
      <p><strong>Last Name:</strong> {user.lastName}</p>
      <p><strong>Country:</strong> {user.country}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>

      <Link to={`/edit-user/${user.id}`}>Edit User</Link>
    </div>
  );
};

export default UserDetails;

// EditUser.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from './userSlice'; // Action to update user

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.users);
  const user = users.find((u) => u.id === parseInt(id));

  const [formData, setFormData] = useState(user || {
    firstName: '',
    lastName: '',
    country: '',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ id: parseInt(id), ...formData }));
    navigate(`/users/${id}`); // Navigate back to user details
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditUser;
              
// App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchUsersAPI } from './api';
import { setUsers } from './userSlice'; // Action to set users
import UserDetails from './UserDetails';
import EditUser from './EditUser';
import DisplayUsers from './DisplayUsers';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchUsersAPI();
      dispatch(setUsers(users)); // Set fetched users in Redux
    };

    fetchData();
  }, [dispatch]);

  return (
    <Router>
      <div>
        <h1>User Management App</h1>
        <Routes>
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route path="/" element={<DisplayUsers />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


// DisplayUsers.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DisplayUsers = () => {
  const users = useSelector((state) => state.users);

  if (!users || users.length === 0) {
    return <div>No users available</div>;
  }

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} -{' '}
            <Link to={`/users/${user.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayUsers;

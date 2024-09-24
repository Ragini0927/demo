// DisplayUsers.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersApi } from '../api/userApi';
import { setUsers } from '../actions/userActions';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const DisplayUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFromApi = await fetchUsersApi();
      dispatch(setUsers(usersFromApi));
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div className="user-list">
      <h2>Users List</h2>
      {users.length ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              {user.firstName} {user.lastName} - {user.country} ({user.phoneNumber})
              <Link to={`/edit-user/${user.id}`}>
                <button>Edit</button> {/* Add edit button */}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
};

export default DisplayUsers;

// EditUser.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { updateUserApi, fetchUserByIdApi } from '../api/userApi';
import { updateUser } from '../actions/userActions';

const EditUser = () => {
  const { id } = useParams();  // Get the user id from the URL
  const dispatch = useDispatch();
  const history = useHistory();
  
  const user = useSelector(state => state.users.find(user => user.id === parseInt(id)));
  const [editedUser, setEditedUser] = useState({
    firstName: '',
    lastName: '',
    country: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!user) {
        const userData = await fetchUserByIdApi(id);
        setEditedUser(userData);
      } else {
        setEditedUser(user);
      }
    };
    loadUser();
  }, [user, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async () => {
    const updatedUser = await updateUserApi(editedUser);
    dispatch(updateUser(updatedUser));  // Dispatch action to update user in Redux store
    history.push('/display-users');  // Redirect to the users list
  };

  const isValid = editedUser.firstName && editedUser.lastName && editedUser.country && editedUser.phoneNumber;

  return (
    <div className="edit-user-form">
      <h2>Edit User</h2>
      <input type="text" name="firstName" placeholder="First Name" value={editedUser.firstName} onChange={handleInputChange} />
      <input type="text" name="lastName" placeholder="Last Name" value={editedUser.lastName} onChange={handleInputChange} />
      <input type="text" name="country" placeholder="Country" value={editedUser.country} onChange={handleInputChange} />
      <input type="text" name="phoneNumber" placeholder="Phone Number" value={editedUser.phoneNumber} onChange={handleInputChange} />
      <button disabled={!isValid} onClick={handleSubmit}>Update User</button>
    </div>
  );
};

export default EditUser;

// actions/userActions.js
export const addUser = (user) => ({
  type: 'ADD_USER',
  payload: user
});

export const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users
});

export const updateUser = (user) => ({
  type: 'UPDATE_USER',
  payload: user
});

// reducers/userReducer.js
const initialState = {
  users: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        )
      };
    default:
      return state;
  }
};

// api/userApi.js

// Fetch a user by ID
export const fetchUserByIdApi = async (id) => {
  const response = await fetch(`https://yourapi.com/users/${id}`);
  return await response.json();
};

// Update a user
export const updateUserApi = async (user) => {
  const response = await fetch(`https://yourapi.com/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return await response.json();
};
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddUser from './components/AddUser';
import DisplayUsers from './components/DisplayUsers';
import EditUser from './components/EditUser';  // Import EditUser component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add-user" component={AddUser} />
        <Route path="/display-users" component={DisplayUsers} />
        <Route path="/edit-user/:id" component={EditUser} />  {/* Add route for EditUser */}
      </Switch>
    </Router>
  );
}

export default App;

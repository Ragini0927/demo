import React, { Component } from 'react';
import axios from 'axios';

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      error: null,
    };
  }

  // Fetch participant data
  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:3001/participants'); // Replace with actual API endpoint
      this.setState({ participants: response.data });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // Handle listing duplicate profiles
  listDuplicateProfiles = () => {
    // Implement logic to find duplicates in this.state.participants
    console.log('Listing duplicate profiles...');
  };

  // Handle deleting duplicate profiles
  deleteDuplicateProfiles = () => {
    // Implement logic to delete duplicates
    console.log('Deleting duplicate profiles...');
  };

  render() {
    const { participants, error } = this.state;

    return (
      <div>
        <h2>Admin Panel</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={this.listDuplicateProfiles}>List Duplicate Profiles</button>
        <button onClick={this.deleteDuplicateProfiles}>Delete Duplicate Profiles</button>

        <h3>Participants</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name}</li> // Adjust based on your data structure
          ))}
        </ul>
      </div>
    );
  }
}

export default AdminComponent;
                            

import React, { Component } from 'react';
import axios from 'axios';

class AdminComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: [],
      duplicates: [],
      error: null,
    };
  }

  // Fetch participant data
  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:3001/participants'); // Replace with actual API endpoint
      this.setState({ participants: response.data }, this.findDuplicates);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  // Identify duplicate profiles based on email
  findDuplicates = () => {
    const { participants } = this.state;
    const duplicates = [];

    const seen = {}; // Object to track seen emails or names
    participants.forEach((participant) => {
      const key = participant.email; // Use email or name as the key

      if (seen[key]) {
        duplicates.push(participant);
      } else {
        seen[key] = true;
      }
    });

    this.setState({ duplicates });
  };

  // Handle listing duplicate profiles
  listDuplicateProfiles = () => {
    const { duplicates } = this.state;
    if (duplicates.length === 0) {
      console.log('No duplicate profiles found.');
    } else {
      console.log('Duplicate profiles:', duplicates);
    }
  };

  // Handle deleting duplicate profiles
  deleteDuplicateProfiles = () => {
    const { duplicates, participants } = this.state;

    const remainingParticipants = participants.filter(
      (participant) => !duplicates.some((duplicate) => duplicate.id === participant.id)
    );

    this.setState({ participants: remainingParticipants, duplicates: [] }, () => {
      console.log('Deleted duplicate profiles.');
    });
  };

  render() {
    const { participants, duplicates, error } = this.state;

    return (
      <div>
        <h2>Admin Panel</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={this.listDuplicateProfiles}>List Duplicate Profiles</button>
        <button onClick={this.deleteDuplicateProfiles}>Delete Duplicate Profiles</button>

        <h3>Participants</h3>
        <ul>
          {participants.map((participant) => (
            <li key={participant.id}>{participant.name} ({participant.email})</li>
          ))}
        </ul>

        {duplicates.length > 0 && (
          <div>
            <h4>Duplicates Found:</h4>
            <ul>
              {duplicates.map((duplicate) => (
                <li key={duplicate.id}>{duplicate.name} ({duplicate.email})</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default AdminComponent;

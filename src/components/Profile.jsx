import React from 'react';
import { fetchUserData, cancelFetch } from './dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: null
    }
  }
  loadUserData() {
    this.setState({ userData: null })
    this.fetchID = fetchUserData(this.props.username, (userData) => {
      this.setState({ userData });
    });
  }

  //Add a lifecycle method for when the component mounts
  componentDidMount() {
    this.loadUserData()
  }

  //Add a lifecycle method for when the component unmounts
  componentWillUnmount() {
    cancelFetch(this.fetchID)
  }


  // lifecycle method for when the component updates
  componentDidUpdate(prevProps) {

    if (this.props.username !== prevProps.username) {
      cancelFetch(this.fetchID);
      this.loadUserData()
    }

  }


  //Displaying User Data
  render() {
    const isLoading = this.state.userData === null ? true : false;
    const name = isLoading ? "Loading ... " : this.state.userData.name;
    const bio = isLoading ? "Loading ... " : this.state.userData.bio;
    const friends = isLoading ? [] : this.state.userData.friends;

    let className = 'Profile';
    if (isLoading) {
      className += ' loading';
    }

    return (
      <div className={className}>
        <div className="profile-picture">
          {/*  update the user’s profile picture. */}
          {!isLoading && <img src={this.state.userData.profilePictureUrl} alt="" />}
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}
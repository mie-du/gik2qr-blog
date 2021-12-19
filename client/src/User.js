import React, { Component } from 'react';
import UserModel from './UserModel';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.model = new UserModel();
    this.state = { users: [] };
  }
  componentDidMount() {
    this.model.getAll().then((res) => {
      this.setState({ users: res.data });
    });
  }

  createFakeUser() {
    const user = {
      firstName: 'Tomten',
      lastName: 'Jansson',
      email: 'tomten@nordpolen.se',
      username: 'tomteyeah'
    };
    this.model.createUser(user);
  }
  render() {
    console.log(this.state.users);
    return <div>User</div>;
  }
}

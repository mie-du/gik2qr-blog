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
  saveUser() {
    const user = this.state.users[0];
    user.firstName = 'Yoshi';
    console.log(user);
    this.model.updateUser(user);
  }
  deleteUser() {}
  validateUser() {}

  render() {
    console.log(this.state.users);
    if (this.state.users[0]) {
      this.saveUser(this.state.users[0]);
    }
    return <div>User</div>;
  }
}

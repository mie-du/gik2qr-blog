import React, { Component } from 'react';
import UserModel from './UserModel';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.model = new UserModel();
    this.state = { users: [] };
  }
  componentDidMount() {
    this.model.getAll().then((result) => {
      this.setState({ users: result });
    });
  }

  createFakeUser() {
    const user = {
      firstName: 'Mikaela',
      lastName: 'Hedberg',
      email: 'mikaela.hedberg@gmail.comj',
      username: 'termedea'
    };
    return user;
  }
  saveUser(user) {
    if (user.id) {
      this.model.updateUser(user).then((result) => {
        console.log(result);
      });
    } else {
      this.model.createUser(user).then((result) => {
        console.log(result);
      });
    }
  }
  deleteUser(user) {
    this.model.deleteUser(user).then((result) => {
      console.log('Kom något tillbaka?');
      console.log(result);
    });
  }
  validateUser() {}
  changeUser() {}

  render() {
    /*    console.log('--- render ---');
    console.log(this.state.users); */

    if (this.state.users[0]) {
      this.saveUser(this.state.users[0]);
    }
    return <div>User</div>;
  }
}

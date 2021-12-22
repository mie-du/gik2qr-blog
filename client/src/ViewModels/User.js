import React, { Component } from 'react';
import UserModel from '../Models/UserModel';
import UserList from '../Views/UserList';
import { Container, Typography } from '@mui/material';

import UserView from '../Views/UserView';
import UserEdit from '../Views/UserEdit';

class User extends Component {
  constructor(props) {
    super(props);
    this.model = new UserModel();
    this.state = {
      users: [],
      action: 'view',
      id: 0
    };

    this.mapActions();
  }

  mapActions() {
    const params = this.props.match.params;
    const url = this.props.match.url;
    this.state.action = 'view';
    this.state.id = params.id || 0;

    if (url && url.indexOf('new') > 0) {
      //ignore all else if new is in the url.
      this.state.action = 'new';
      this.state.id = 0;
    } else if (params.action) {
      this.state.action = params.action;
    }
  }

  componentDidMount() {
    this.model.getAll().then((result) => {
      this.setState({ users: result.data });
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
      console.log(result);
    });
  }
  validateUser() {}
  changeUser() {}

  renderSwitch() {
    switch (this.state.action) {
      case 'new': {
        return <UserEdit validate={this.validateUser} save={this.saveUser} />;
      }
      case 'edit': {
        if (this.state.id) {
          return (
            <UserEdit
              user={this.state.users.find((user) => (user.id = this.state.id))}
              validate={this.validateUser}
              save={this.saveUser}
            />
          );
        }
        break;
      }
      case 'view': {
        if (this.state.id) {
          return (
            <UserView
              user={this.state.users.find((user) => (user.id = this.state.id))}
            />
          );
        } else {
          return (
            <>
              <UserList users={this.state.users} />
            </>
          );
        }
      }
      default:
        <>
          <UserList users={this.state.users} />
        </>;
    }
  }
  render() {
    //re-map actions on render, if url changed
    this.mapActions();
    return <div>{this.state.users && this.renderSwitch()}</div>;
  }
}
export default User;

import React, { Component } from 'react';
import UserModel from '../Models/UserModel';
import UserList from '../Views/UserList';

import UserView from '../Views/UserView';
import UserEdit from '../Views/UserEdit';

class User extends Component {
  constructor(props) {
    super(props);
    this.model = new UserModel();
    this.state = {
      users: []
    };

    this.mapActions();
  }

  mapActions() {
    const params = this.props.match.params;
    const url = this.props.match.url;
    this.action = 'view';
    this.id = params.id || 0;

    if (url && url.indexOf('new') > 0) {
      //ignore all else if new is in the url.
      this.action = 'new';
      this.id = 0;
    } else if (params.action) {
      this.action = params.action;
    }
  }
  componentDidMount() {
    this.model.getAll().then((result) => {
      this.setState({ users: result.data });
    });
  }
  componentDidUpdate() {
    this.mapActions();
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
    switch (this.action) {
      case 'new': {
        return <UserEdit validate={this.validateUser} save={this.saveUser} />;
      }
      case 'edit': {
        if (this.id) {
          return (
            <UserEdit
              user={this.users.find((user) => (user.id = this.id))}
              validate={this.validateUser}
              save={this.saveUser}
            />
          );
        }
        break;
      }
      case 'view': {
        if (this.id) {
          return (
            <UserView
              user={this.state.users.find((user) => (user.id = this.id))}
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
    return <div>{this.state.users && this.renderSwitch()}</div>;
  }
}
export default User;

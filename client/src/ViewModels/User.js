/* Syfte: 
- Lyft state
- Logik lämnat till "controller"
- Hämtar data och ger till vy
     */
/*eslint eqeqeq: "off"*/
import React, { Component } from 'react';
import UserModel from '../Models/UserModel';
import UserList from '../Views/UserList';

import UserView from '../Views/UserView';
import UserEdit from '../Views/UserEdit';

import validator from 'validator';

class User extends Component {
  constructor(props) {
    super(props);
    this.model = new UserModel();
    this.state = {
      users: null,
      currentUser: null,
      validation: null
    };

    this.onUserSave = this.onUserSave.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.validateUser = this.validateUser.bind(this);
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
      if (result.status === 200) this.setState({ users: result.data });
      this.mapActions();
      if (this.id) {
        this.setState({
          currentUser: this.state.users.find((user) => user.id == this.id)
        });
      }
    });
  }
  componentDidUpdate() {}

  renderSwitch() {
    switch (this.action) {
      case 'new': {
        return <UserEdit save={this.saveUser} />;
      }
      case 'edit': {
        if (this.id) {
          return (
            <UserEdit
              user={this.state.currentUser}
              onChange={this.onUserChange}
              onSave={this.onUserSave}
              validation={this.state.validation}
            />
          );
        }
        break;
      }
      case 'view': {
        if (this.id) {
          return <UserView user={this.state.currentUser} />;
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

  onUserSave() {
    const user = this.state.currentUser;
    if (user.id) {
      this.model.updateUser(user).then((result) => {});
    } else {
      this.model.createUser(user).then((result) => {
        console.log(result);
      });
    }
  }
  validateUser(field, value) {
    console.log(field, value);
    const validationData = {
      ...this.state.validation,
      [field]: { valid: false, message: 'fel' }
    };
    this.setState({
      validation: validationData
    });
  }
  onUserChange(e) {
    const newUser = {
      ...this.state.currentUser,
      [e.target.name]: e.target.value
    };
    this.validateUser(e.target.name, e.target.value);

    this.setState({ currentUser: newUser });
  }

  onUserDelete(user) {
    this.model.deleteUser(user).then((result) => {
      console.log(result);
    });
  }

  render() {
    this.mapActions();
    return <div>{this.state.users ? this.renderSwitch() : 'No data'}</div>;
  }
}
export default User;

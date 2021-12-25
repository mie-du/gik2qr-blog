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
      validation: null
    };

    this.onUserSave = this.onUserSave.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.findOne = this.findOne.bind(this);
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
    this.mapActions();
    this.fetchAll();
  }

  componentDidUpdate() {
    this.mapActions();
  }

  fetchAll() {
    this.model.getAll().then((result) => {
      if (result.status === 200) this.setState({ users: result.data });
      this.mapActions();
    });
  }

  findOne(id) {
    return this.state.users.find((user) => user.id == id);
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

  newUser() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      description: ''
    };
  }

  onUserSave(newUser) {
    const users = this.state.users;
    if (newUser.id) {
      const userIndex = users.findIndex((user) => user.id == newUser.id);
      console.log(userIndex);
      users.splice(userIndex, 1, newUser);
      this.setState({ users });

      this.model.updateUser(newUser).then((result) => {});
    } else {
      this.model.createUser(newUser).then((result) => {
        this.setState(users.splice(0, 0, result.body));
      });
    }
    console.log('new state', this.state.users);
  }

  onUserDelete(user) {
    this.model.deleteUser(user).then((result) => {
      console.log(result);
    });
  }

  renderSwitch() {
    this.mapActions();

    switch (this.action) {
      case 'new': {
        console.log('new', this.id, this.action);
        return (
          <UserEdit
            user={this.newUser()}
            onSave={this.onUserSave}
            validation={this.state.validation}
          />
        );
      }
      case 'edit': {
        console.log('edit', this.id, this.action);
        if (this.id) {
          return (
            <UserEdit
              user={this.findOne(this.id)}
              onSave={this.onUserSave}
              onChange={this.onUserChange}
              validation={this.state.validation}
            />
          );
        }
        break;
      }
      case 'view': {
        if (this.id) {
          console.log('view one', this.id, this.action);
          return <UserView user={this.findOne(this.id)} />;
        } else {
          console.log('view all', this.id, this.action);
          console.log(this.state.users);
          return (
            <>
              <UserList users={this.state.users} />
            </>
          );
        }
      }
      default: {
        <>
          <UserList users={this.state.users} />
        </>;
      }
    }
  }

  render() {
    return <div>{this.state.users ? this.renderSwitch() : 'No data'}</div>;
  }
}
export default User;

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';

import React, { Component } from 'react';
import UserModel from '../Models/UserModel';
import { PlaceholderAvatar } from '../Helpers/components';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.model = new UserModel();
    this.state = { users: [] };
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

  render() {
    console.log(this.state.users);
    return (
      <>
        <Typography variant='h5'>Visa alla användare</Typography>
        <List sx={{ width: '100%' }}>
          {this.state.users &&
            this.state.users.map((user) => {
              return (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <PlaceholderAvatar person={user} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${user.username}`}
                    secondary={user.email}></ListItemText>
                </ListItem>
              );
            })}
        </List>
      </>
    );
  }
}

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
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
    console.log('--- render ---');
    console.log(this.state.users);
    return (
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {this.state.users &&
          this.state.users.map((user) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.firstName} ${user.lastName}`}
                  secondary={user.email}></ListItemText>
              </ListItem>
            );
          })}
      </List>
    );
  }
}

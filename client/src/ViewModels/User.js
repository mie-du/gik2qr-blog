/* Syfte: 
- Lyft state
- Logik lämnat till "controller"
- Hämtar data och ger till vy
     */
/*eslint eqeqeq: "off"*/
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  Typography,
  List,
  ListItemText
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import React, { Component } from 'react';
import UserModel from '../Models/UserModel';

class User extends Component {
  constructor(props) {
    super(props);
    this.model = new UserModel();
    this.state = {
      users: null
    };
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

  newUser() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      description: ''
    };
  }

  saveUser(user) {
    if (user.id) {
      this.model.updatePost(user).then((result) => {
        console.log(result);
      });
    } else {
      this.model.createPost(user).then((result) => {
        console.log(result);
      });
    }
  }

  onUserDelete(user) {
    this.model.deleteUser(user).then((result) => {
      console.log(result);
    });
  }
  deleteUser(user) {
    this.model.deletePost(user).then((result) => {
      console.log(result);
    });
  }

  changeUser() {}

  render() {
    console.log(this.state.users);
    return (
      this.state.users && (
        <>
          <Typography variant='h2'>Visa alla användare</Typography>
          <List sx={{ width: '100%' }}>
            {this.state.users &&
              this.state.users.map((user) => {
                return (
                  <ListItem key={user.id}>
                    <ListItemAvatar>
                      {user?.imageUrl ? (
                        <Avatar alt={user.username} src={user.imageUrl} />
                      ) : (
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.username}`}
                      secondary={user.email}></ListItemText>
                  </ListItem>
                );
              })}
          </List>
        </>
      )
    );
  }
}
export default User;

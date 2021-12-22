import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';
import React, { Component } from 'react';
import PostModel from './PostModel';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.model = new PostModel();
    this.state = { posts: [] };
  }
  componentDidMount() {
    this.model.getAll().then((result) => {
      this.setState({ posts: result.data });
    });

    /* this.savePost(this.createFakePost()); */
  }

  createFakePost() {
    const post = {
      title: 'Hej',
      userId: 28
    };
    return post;
  }
  savePost(post) {
    if (post.id) {
      this.model.updatePost(post).then((result) => {
        console.log(result);
      });
    } else {
      this.model.createPost(post).then((result) => {
        console.log(result);
      });
    }
  }
  deletePost(post) {
    this.model.deletePost(post).then((result) => {
      console.log(result);
    });
  }
  validateUser() {}
  changeUser() {}

  render() {
    return (
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {this.state.posts &&
          this.state.posts.map((post) => {
            return (
              <ListItem key={post.id}>
                <ListItemAvatar>
                  <Avatar>
                    <ShortTextIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={`${post.title}`}
                  secondary={post.body}></ListItemText>
              </ListItem>
            );
          })}
      </List>
    );
  }
}

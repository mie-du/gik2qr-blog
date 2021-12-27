import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';
import React, { Component } from 'react';
import PostModel from '../Models/PostModel';

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

    this.mapActions();
  }
  componentDidUpdate() {
    this.mapActions();
  }

  mapActions() {
    const params = this.props.match.params;
    const url = this.props.match.url;
    console.log(params, url);
    this.id = params.id || 0;
    this.action = 'view';

    if (url.indexOf('new') > 0) {
      this.action = 'new';
      this.id = 0;
    } else if (url.indexOf('edit') > 0) {
      this.action = 'edit';
    }
    console.log(this.action, this.id);
  }

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

  changeUser() {}
}

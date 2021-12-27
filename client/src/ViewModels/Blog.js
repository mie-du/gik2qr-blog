import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import ShortTextIcon from '@mui/icons-material/ShortText';
import React, { Component } from 'react';
import PostModel from '../Models/PostModel';
import { ACTIONS } from '../Helpers/constants';
import PostList from '../Views/PostList';
import PostEdit from '../Views/PostEdit';
import PostView from '../Views/PostView';

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.model = new PostModel();
    this.state = { posts: [] };
  }

  /* #region Lifecycle */
  componentDidMount() {
    this.model.getAll().then((result) => {
      this.setState({ posts: result.data });
    });

    this.mapActions();
  }

  /* #endregion */

  mapActions() {
    const params = this.props.match.params;
    const url = this.props.match.url;

    this.id = params.id || 0;
    this.action = ACTIONS.VIEW;

    if (url.indexOf('new') > 0) {
      this.action = ACTIONS.NEW;
      this.id = 0;
    } else if (url.indexOf('edit') > 0) {
      this.action = ACTIONS.EDIT;
    }
  }

  renderSwitch() {
    this.mapActions();
    switch (this.action) {
      case ACTIONS.NEW: {
        console.log(this.id, this.action);
        return <PostEdit />;
      }
      case ACTIONS.EDIT: {
        //can only edit if id exists
        if (this.id) {
          console.log(this.id, this.action);
          return <PostEdit post={this.findOne(this.id)} />;
        }
        return <Typography>404 Not found</Typography>;
      }
      case ACTIONS.VIEW: {
        if (this.id) {
          console.log('view one', this.id, this.action);
          return <PostView post={this.findOne(this.id)} />;
        }
        console.log('view all', this.id, this.action);
        return <PostList posts={this.state.posts} />;
      }
      default: {
        return <Typography>404 Not found</Typography>;
      }
    }
  }

  render() {
    return this.renderSwitch();
  }
  /* #region CRUD  */
  findOne(id) {
    console.log('find one?', id);
    return this.state.posts && this.state.posts.find((posts) => posts.id == id);
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
  /* #endregion */
}

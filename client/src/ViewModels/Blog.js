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
        console.log('new', this.id, this.action);
        return <></>;
      }
      case ACTIONS.EDIT: {
        //can only edit if id exists
        if (this.id) console.log('Edit', this.id, this.edit);
        return <></>;
      }
      case ACTIONS.VIEW: {
        if (this.id) {
          console.log('view one', this.id, this.action);
          return <></>;
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

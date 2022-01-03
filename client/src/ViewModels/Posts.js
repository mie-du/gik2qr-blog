import { Typography } from '@mui/material';
import React, { Component } from 'react';
import PostModel from '../Models/PostModel';
import { ACTIONS } from '../Helpers/constants';
import PostList from '../Views/PostList';
import PostEdit from '../Views/PostEdit';
import PostView from '../Views/PostView';

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.model = new PostModel();
    this.state = { posts: [], currentPost: {} };
  }

  /* #region Lifecycle */
  componentDidMount() {
    this.model.getSummary().then((result) => {
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
    console.log(`--Post Routing ${this.id} ${this.action} --`);
    switch (this.action) {
      case ACTIONS.NEW: {
        console.log('view');
        return <></>;
      }
      case ACTIONS.EDIT: {
        //can only edit if id exists
        if (this.id) {
          console.log(this.id, this.action);
          return <></>;
        }
        return <Typography>404 Not found</Typography>;
      }
      case ACTIONS.VIEW: {
        if (this.id) {
          console.log('view one');
          return <PostView post={this.findOne(this.id)} />;
        }
        console.log('view all');
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
  getAll() {
    this.model.getSummary().then((result) => {
      this.setState({ posts: result.data });
    });
  }

  findOne(id) {
    return this.state.posts.filter((post) => post.content.id == id)[0];
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

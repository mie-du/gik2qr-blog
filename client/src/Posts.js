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
      post.title = 'något ändrat';
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
    console.log('--- render ---');
    console.log(this.state.posts);

    if (this.state.posts[0]) {
      this.savePost(this.state.posts[0]);
    }
    return <div>Posts</div>;
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../server/api';

export default class Posts extends Component {
  state = { posts: [] };
  componentDidMount() {
    api.get('posts').then((result) => {
      this.setState({ posts: result.data });
      console.log(this.state.posts);
    });
  }
  render() {
    return (
      <>
        <ul>
          {this.state.posts &&
            this.state.posts.map((post) => {
              return (
                <li key={`post_${post.id}`}>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}

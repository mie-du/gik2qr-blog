import { Button, TextField } from '@mui/material';
import React, { Component } from 'react';

import api from '../server/api';

export default class PostEdit extends Component {
  state = {
    post: { title: '', body: '', imageUrl: '', author: {}, id: 0 }
  };
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  reset() {
    this.setState({
      post: { title: '', body: '', imageUrl: '', author: {}, id: 0 }
    });
  }
  fetchPost() {
    const paramsId = this.props.match.params.id;
    this.id = !isNaN(paramsId) ? paramsId : 0;

    if (this.id && this.id > 0 && !this.props.new) {
      api.get(`posts/${this.id}`).then((result) => {
        if (result.status === 200) this.setState({ post: result.data });
        console.log(this.state.post);
      });
    } else {
      this.reset();
    }
  }

  componentDidMount() {
    this.fetchPost();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchPost();
    }
  }

  onChange(e) {
    this.setState({
      post: { ...this.state.post, [e.target.name]: e.target.value }
    });
  }

  onSave() {
    console.log(this.state.post);
    if (this.id) {
      api.put('posts', this.state.post).then((result) => {
        if (result.status === 200) alert(result.data.message);
        console.log(result.data);
      });
    } else {
      //skickar även med fake userid
      api.post('posts', { ...this.state.post, userId: 2 }).then((result) => {
        if (result.status === 200) alert('Inlägget skapades');
        console.log(result.data);
      });
    }
  }
  onDelete() {
    api.delete('posts', { data: { id: this.state.post.id } }).then((result) => {
      window.location.href = `/posts/`;
    });
  }

  render() {
    const post = this.state.post;
    return (
      <div>
        <TextField
          color='secondary'
          id='title'
          label='Titel'
          variant='outlined'
          name='title'
          value={post?.title}
          onChange={this.onChange}
          fullWidth
          required
        />
        <TextField
          color='secondary'
          id='body'
          label='Innehåll'
          variant='outlined'
          name='body'
          value={post?.body}
          onChange={this.onChange}
          multiline
          minRows={10}
          fullWidth
          required
        />
        <TextField
          color='secondary'
          id='imageUrl'
          label='Sökväg till bild'
          variant='outlined'
          name='imageUrl'
          value={post?.imageUrl}
          onChange={this.onChange}
          fullWidth
        />
        <TextField
          color='secondary'
          id='tags'
          label='Taggar'
          variant='outlined'
          name='tags'
          fullWidth
        />
        <Button variant='contained' color='primary' onClick={this.onSave}>
          Spara
        </Button>
        {this.id !== 0 && (
          <Button variant='contained' color='error' onClick={this.onDelete}>
            Ta bort
          </Button>
        )}
      </div>
    );
  }
}

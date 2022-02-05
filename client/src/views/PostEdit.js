import { Button, TextField } from '@mui/material';
import React, { Component } from 'react';
import api from '../server/api';

export default class PostEdit extends Component {
  id = 0;
  state = { post: { title: '', body: '', imageUrl: '', author: {}, id: 0 } };
  constructor(props) {
    super(props);
    const paramsId = props.match.params.id;
    this.id = !isNaN(paramsId) ? paramsId : 0;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentDidMount() {
    if (this.id) {
      api.get(`posts/${this.id}`).then((result) => {
        this.setState({ post: result.data });
      });
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
      console.log('update', this.id);
    } else {
      console.log('create');
    }
  }
  onDelete() {
    api.delete('posts', { data: { id: this.state.post.id } });
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
          maxRows={10}
          fullWidth
        />
        <Button variant='contained' color='primary' onClick={this.onSave}>
          Spara
        </Button>
        {this.id !== 0 && (
          <Button variant='contained' color='primary' onClick={this.onDelete}>
            Ta bort
          </Button>
        )}
      </div>
    );
  }
}

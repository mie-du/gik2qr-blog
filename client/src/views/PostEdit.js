import React from 'react';
import PostModel from '../models/PostsModel';
import { TextField, Button } from '@mui/material';

export default class PostEdit extends React.Component {
  state = { post: { title: '', body: '', imageUrl: '', author: {}, tags: [] } };
  postModel = null;
  constructor(props) {
    super(props);
    this.postModel = new PostModel('posts');

    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    const isValidId = !isNaN(id);
    if (isValidId) {
      this.postModel.getById(id).then((post) => {
        this.setState({ post });
      });
    }
  }

  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ post: { ...this.state.post, [field]: value } });
  }

  render() {
    const post = this.state.post;
    console.log(post);

    return (
      <div>
        <TextField
          name='title'
          label='Titel'
          value={post.title}
          onChange={this.onChange}
          fullWidth
        />
        <TextField
          name='body'
          label='Innehåll'
          value={post.body}
          onChange={this.onChange}
          fullWidth
          multiline
          minRows={7}
        />
        <TextField
          name='imageUrl'
          label='Sökväg till bild'
          value={post.imageUrl}
          onChange={this.onChange}
          fullWidth
        />
        <TextField
          name='tags'
          label='Taggar'
          value=''
          onChange={this.onChange}
          fullWidth
        />
        <Button variant='contained' color='primary' onClick={this.onSave}>
          Spara
        </Button>
        <Button variant='contained' color='error' onClick={this.onDelete}>
          Ta bort
        </Button>
      </div>
    );
  }
}

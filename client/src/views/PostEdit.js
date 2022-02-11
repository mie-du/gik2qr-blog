import React from 'react';
import PostModel from '../models/PostsModel';
import { TextField, Button } from '@mui/material';

export default class PostEdit extends React.Component {
  state = { post: { title: '', body: '', imageUrl: '', author: {}, tags: [] } };
  postModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.postModel = new PostModel('posts');
    this.id = this.props.match.params.id;
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidMount() {
    const isValidId = !isNaN(this.id);
    if (isValidId) {
      this.postModel.getById(this.id).then((post) => {
        this.setState({ post });
      });
    }
  }

  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ post: { ...this.state.post, [field]: value } });
  }

  onSave() {
    //om id finns, update
    if (this.id) {
      this.postModel.update(this.state.post).then((result) => {
        console.log(result);
      });
    }
    //annars create
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

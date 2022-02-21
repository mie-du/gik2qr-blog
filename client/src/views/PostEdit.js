import React from 'react';
import PostModel from '../models/PostsModel';
import { TextField, Button, Chip } from '@mui/material';

export default class PostEdit extends React.Component {
  state = { post: { title: '', body: '', imageUrl: '', author: {}, tags: [] } };
  postModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.postModel = new PostModel('posts');
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  reset() {
    this.setState({
      post: { title: '', body: '', imageUrl: '', author: {}, tags: [] }
    });
  }

  fetchPost() {
    this.id = this.props.match.params.id;
    const isValidId = !isNaN(this.id);
    if (isValidId) {
      this.postModel.getById(this.id).then((post) => {
        this.setState({ post });
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
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ post: { ...this.state.post, [field]: value } });
  }

  onSave() {
    if (this.id) {
      this.postModel.update(this.state.post).then((result) => {
        console.log(result);
      });
    } else {
      const postWithUserId = { ...this.state.post, userId: 1 };

      this.postModel.create(postWithUserId).then((result) => {
        console.log('Inlägget sparades');
      });
    }
  }

  onDelete() {
    this.postModel.remove(this.id).then((result) => {
      console.log(result);
    });
  }
  render() {
    const post = this.state.post;

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
        {post.tags &&
          post.tags.map((tag) => (
            <Chip
              onDelete={() => console.log('taggen togs bort')}
              key={`tag_${tag}`}
              label={tag}
              color='secondary'
            />
          ))}
        <Button variant='contained' color='primary' onClick={this.onSave}>
          Spara
        </Button>
        {this.id && (
          <Button variant='contained' color='error' onClick={this.onDelete}>
            Ta bort
          </Button>
        )}
      </div>
    );
  }
}

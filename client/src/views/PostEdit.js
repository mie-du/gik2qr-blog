import React from 'react';
import ResourceModel from '../models/ResourceModel';
import { TextField, Button, Chip, Grid } from '@mui/material';
import TagForm from '../Components/TagForm';
export default class PostEdit extends React.Component {
  state = { post: { title: '', body: '', imageUrl: '', author: {}, tags: [] } };
  postModel = null;
  id = 0;
  constructor(props) {
    super(props);
    this.postModel = new ResourceModel('posts');
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onTagAdd = this.onTagAdd.bind(this);
    this.onTagDelete = this.onTagDelete.bind(this);
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

  onTagAdd(tagString) {
    const tagArray = tagString.split(',');
    const mergedTags = [...new Set([...this.state.post.tags, ...tagArray])];

    this.setState({ post: { ...this.state.post, tags: mergedTags } });
  }

  onTagDelete(tagToRemove) {
    //letar på tagg i array
    const newTagARray = this.state.post.tags.filter(
      (tag) => tag !== tagToRemove
    );

    //uppdaterar state
    this.setState({ post: { ...this.state.post, tags: newTagARray } });
  }
  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({ post: { ...this.state.post, [field]: value } });
  }

  onSave() {
    if (this.id) {
      console.log(this.state.post);
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
      window.location.href = '/';
    });
  }
  render() {
    const post = this.state.post;

    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name='title'
            label='Titel'
            value={post.title}
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='body'
            label='Innehåll'
            value={post.body}
            onChange={this.onChange}
            fullWidth
            multiline
            minRows={7}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='imageUrl'
            label='Sökväg till bild'
            value={post.imageUrl}
            onChange={this.onChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TagForm onSave={this.onTagAdd} />
        </Grid>
        <Grid item xs={12}>
          {post.tags &&
            post.tags.map((tag, i) => {
              return (
                <Chip
                  onDelete={() => this.onTagDelete(tag)}
                  color='secondary'
                  key={`tag_${i}`}
                  label={tag}></Chip>
              );
            })}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'flex-end', gap: '.4rem' }}>
          <Button variant='contained' color='primary' onClick={this.onSave}>
            Spara
          </Button>
          {!isNaN(this.id) && this.id > 0 && (
            <Button variant='contained' color='error' onClick={this.onDelete}>
              Ta bort
            </Button>
          )}
        </Grid>
      </Grid>
    );
  }
}

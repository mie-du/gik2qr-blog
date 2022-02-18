import React from 'react';

import { TextField, Button, Grid, Chip } from '@mui/material';

import { Link } from 'react-router-dom';
import { rightAligned } from '../helpers/styles';

import ResourceModel from '../models/ResourceModel';

export default class PostEdit extends React.Component {
  state = {
    post: {
      title: '',
      body: '',
      imageUrl: '',
      author: {},
      tags: [],
      tagsString: ''
    }
  };
  postModel = null;
  id = 0;
  constructor(props) {
    super(props);

    this.postModel = new ResourceModel('posts');
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  reset() {
    this.setState({
      post: {
        title: '',
        body: '',
        imageUrl: '',
        author: {},
        tags: [],
        tagsString: ''
      }
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
      const randomUser = Math.ceil(Math.random() * 2);
      const postWithUserId = {
        ...this.state.post,
        userId: randomUser
      };

      this.postModel.create(postWithUserId).then((result) => {
        console.log('Inlägget sparades');
        this.reset();
      });
    }
  }

  onDelete() {
    this.postModel.remove(this.id).then((result) => {
      console.log(result);
      window.location.href = '/';
    });
  }

  onTagDelete(name) {
    const newTagArray = this.state.post.tags.filter((tag) => tag !== name);
    this.setState({ post: { ...this.state.post, tags: newTagArray } });
  }

  onTagAdd() {
    const newTags = this.state.post.tagsString.split(',');
    //förhindrar dupliceringar
    const mergedTags = [...new Set([...this.state.post.tags, ...newTags])];
    this.setState({
      post: { ...this.state.post, tags: mergedTags }
    });
  }

  render() {
    const post = this.state.post;

    return (
      <Grid container rowSpacing={3} sx={{ marginTop: '3rem' }}>
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
          <Grid container columnSpacing={3} alignItems='center'>
            <Grid item xs={10}>
              <TextField
                name='tagsString'
                label='Taggar (ange separerade med kommatecken)'
                value={this.state.tagsString}
                onChange={this.onChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                onClick={this.onTagAdd}
                variant='contained'
                color='secondary'>
                Lägg till tagg
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {post.tags && (
          <Grid item xs={12}>
            {post.tags.map((tag) => {
              return (
                <Chip
                  color='secondary'
                  sx={{ marginRight: '.5rem' }}
                  key={tag}
                  onDelete={() => this.onTagDelete(tag)}
                  label={tag}
                />
              );
            })}
          </Grid>
        )}
        <Grid item xs={3}>
          {!isNaN(this.id) && this.id > 0 && (
            <Button variant='contained' color='error' onClick={this.onDelete}>
              Ta bort
            </Button>
          )}
        </Grid>
        <Grid item xs={9} sx={rightAligned}>
          <Link to={post.id ? `/posts/${post.id}` : '/'}>
            <Button variant='contained' color='primary'>
              Tillbaka
            </Button>
          </Link>
          <Button variant='contained' color='primary' onClick={this.onSave}>
            Spara
          </Button>
        </Grid>
      </Grid>
    );
  }
}

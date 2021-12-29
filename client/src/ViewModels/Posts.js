import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  Typography
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { Component } from 'react';
import PostModel from './Models/PostModel';
import { Link } from 'react-router-dom';
import { PlaceholderAvatar } from './Helpers/components';
import { toDateTimeString } from './Helpers/formating';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.model = new PostModel();
    this.state = { posts: [] };
  }
  componentDidMount() {
    this.model.getSummary().then((result) => {
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
    console.log(this.state.posts);
    return (
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ width: '100%' }}>
        {this.state.posts &&
          this.state.posts.map((post) => {
            const { id, title, body, imageUrl, updatedAt } = post.content;

            const { author } = post;
            const { tags } = post;

            return (
              <Grid item key={id} xs='auto'>
                <Card
                  sx={{
                    width: 345,
                    minHeight: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                  <Box>
                    <Link to={`/users/${author.id}`}>
                      <CardHeader
                        avatar={<PlaceholderAvatar person={author} />}
                        title={`Skrivet av ${author.firstName} ${author.lastName} (${author.username})`}
                        subheader={`Senast uppdaterad: ${toDateTimeString(
                          updatedAt
                        )}`}
                      />
                    </Link>
                    <CardMedia
                      component='img'
                      height='200'
                      image={
                        imageUrl
                          ? imageUrl
                          : `${process.env.PUBLIC_URL}/images/img-placeholder.svg`
                      }
                      alt={`Bild för post: ${title}`}
                    />
                    <CardContent>
                      <Link to={`/posts/${id}`}>
                        <Typography variant='h3' color='text.secondary'>
                          {title}
                        </Typography>
                      </Link>
                      <Typography variant='body1'>{`${body.substring(
                        0,
                        100
                      )}...`}</Typography>
                      <Box
                        sx={{
                          marginTop: '1rem',
                          display: 'flex',
                          width: '100%',
                          gap: '.2rem',
                          flexWrap: 'wrap'
                        }}>
                        {tags &&
                          tags.map((tag, i) => {
                            if (i < 4)
                              return (
                                <Chip
                                  sx={{ fontSize: '.7rem' }}
                                  color='secondary'
                                  variant='contained'
                                  label={tag.name}
                                  key={`tag_${tag.id}`}></Chip>
                              );
                            return <Typography>...</Typography>;
                          })}
                      </Box>
                    </CardContent>
                  </Box>
                  <CardActions
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={`/posts/${id}`}>
                      <Button endIcon={<ArrowForwardIcon />}>Läs mer</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    );
  }
}

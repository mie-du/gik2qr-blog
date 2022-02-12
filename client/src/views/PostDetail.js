import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import UserItemSmall from '../Components/UserItemSmall';
import { teal } from '@mui/material/colors';
import { toDateTimeString } from '../helpers/formatting';
import { PlaceHolderAvatar } from '../Components/PlaceHolders';
import { Box } from '@mui/system';
import Tag from '../Components/Tag';

export default function PostDetail(props) {
  const id = props.match.params.id;
  const isValidId = !isNaN(id);

  const postModel = new PostModel('posts');
  const [post, setPost] = useState({});

  useEffect(() => {
    if (isValidId) {
      postModel.getById(id).then((post) => {
        setPost(post);
      });
    }
  }, []);

  return (
    <>
      {post.author ? (
        <>
          <Card sx={{ maxWidth: 800, margin: '0 auto' }}>
            <Box
              sx={{
                padding: '1rem',
                color: teal[900]
              }}>
              <Typography
                gutterBottom
                variant='h3'
                component='h2'
                sx={{ fontVariant: 'small-caps' }}>
                {post.title}
              </Typography>
              {post.tags &&
                post.tags.map((tag) => {
                  return <Tag tag={tag} />;
                })}
            </Box>
            {post.imageUrl && (
              <CardMedia
                component='img'
                height='600'
                image={post.imageUrl}
                alt='green iguana'
              />
            )}
            <CardContent>
              <Typography variant='body2' color='text.secondary'>
                Skrivet: {toDateTimeString(post.createdAt)}
              </Typography>
              <UserItemSmall user={post.author} />

              <Typography variant='body2' color='text.secondary'>
                {post.body}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant='contained'>
                <Link to={`/posts/${post.id}/edit`}> Ändra</Link>
              </Button>
            </CardActions>
          </Card>
        </>
      ) : (
        <CircularProgress color='secondary' />
      )}

      {post.comments && (
        <Box
          sx={{
            maxWidth: '800px',
            margin: '2rem auto',
            padding: '1rem',
            boxSizing: 'border-box'
          }}>
          <Typography variant='h5' sx={{ fontVariant: 'small-caps' }}>
            Kommentarer
          </Typography>
          <List
            sx={{
              marginTop: 3,
              width: '100%'
            }}>
            {post.comments.map((comment, i) => {
              return (
                <Paper
                  elevation={1}
                  sx={{
                    padding: '1rem',
                    marginBottom: '.3rem',
                    boxSizing: 'border-box'
                  }}>
                  <ListItem key={`com_${i}`}>
                    <ListItemAvatar>
                      <PlaceHolderAvatar
                        user={{
                          username: comment.author,
                          imageUrl: comment.authorImage
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography variant='body2'>
                            Av: {comment.author}
                          </Typography>
                          <Typography variant='body1'>
                            {comment.title}
                          </Typography>
                        </>
                      }
                      secondary={comment.body}
                    />
                  </ListItem>
                </Paper>
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
}

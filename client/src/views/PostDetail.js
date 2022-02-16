import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  List,
  Paper,
  Typography
} from '@mui/material';
import { Link } from 'react-router-dom';
import UserItemSmall from '../Components/UserItemSmall';
import { grey } from '@mui/material/colors';
import { toDateTimeString } from '../helpers/formatting';
import { pageSubtitle, pageTitle, rightAligned } from '../helpers/styles';
import { Box } from '@mui/system';
import Tag from '../Components/Tag';
import CommentForm from '../Components/CommentForm';
import CommonList from '../Components/Lists/CommonList';
import CommentListItem from '../Components/CommentListItem';
import ResourceModel from '../models/ResourceModel';

export default function PostDetail(props) {
  const id = props.match.params.id;
  const isValidId = !isNaN(id);
  const postModel = new ResourceModel('posts');

  const [post, setPost] = useState({});

  useEffect(() => {
    if (isValidId) {
      postModel.getById(id).then((post) => {
        setPost(post);
        console.log(post);
      });
    }
  }, []);

  const addComment = (comment) => {
    postModel.addComment(post.id, comment).then((post) => {
      setPost(post);
    });
  };
  return (
    <>
      {post.author ? (
        <>
          <Card
            sx={{
              maxWidth: 800,
              margin: '0 auto',
              backgroundColor: grey[50]
            }}>
            <Box
              sx={{
                padding: '1rem'
              }}>
              <Typography {...pageTitle}>{post.title}</Typography>
              {post.tags &&
                post.tags.map((tag) => {
                  return <Tag tag={tag} key={tag} />;
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
            <CardActions sx={rightAligned}>
              {props.location.from && (
                <Link to={props.location.from}>
                  <Button variant='contained' color='primary'>
                    Tillbaka
                  </Button>
                </Link>
              )}
              <Link
                to={{
                  pathname: `/posts/${post.id}/edit`,
                  from: props.location.pathname
                }}>
                <Button variant='contained'>Ändra</Button>
              </Link>
            </CardActions>
          </Card>
        </>
      ) : (
        <CircularProgress color='secondary' />
      )}
      <Paper
        sx={{
          maxWidth: '800px',
          margin: '2rem auto',
          padding: '1rem',
          boxSizing: 'border-box',
          backgroundColor: grey[50]
        }}>
        <Typography
          sx={pageSubtitle.sx}
          variant={pageSubtitle.variant}
          component={pageSubtitle.component}>
          Kommentarer
        </Typography>

        <CommentForm onSave={addComment} />

        {post.comments?.length > 0 && (
          <List
            sx={{
              marginTop: 3,
              width: '100%'
            }}>
            <CommonList
              items={post.comments}
              itemComponent={CommentListItem}
              resourceName='comment'
            />
          </List>
        )}
      </Paper>
    </>
  );
}

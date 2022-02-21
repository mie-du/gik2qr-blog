import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { toDateTimeString } from '../helpers/formatting';
import { PlaceHolderAvatar } from '../helpers/PlaceHolderComponents';

import Tag from './Tag';
import UserItemSmall from './UserItemSmall';

export default function PostItemLarge({ post }) {
  return (
    <Card
      sx={{
        maxWidth: 700,
        padding: 2,
        margin: '0 auto',
        backgroundColor: grey[50]
      }}>
      <CardContent>
        <UserItemSmall user={post.author} />
      </CardContent>
      <CardHeader
        title={post.title}
        subheader={`Skrivet: ${toDateTimeString(post.createdAt)}`}
      />
      <CardMedia
        component='img'
        image={
          post.imageUrl
            ? post.imageUrl
            : `${process.env.PUBLIC_URL}/images/img-placeholder.svg`
        }
        alt={`Bild till inlägget ${post.title}`}
      />
      <CardContent>
        <Box sx={{ marginBottom: 2 }}>
          {post.tags &&
            post.tags.map((tag, i) => {
              return <Tag tag={tag} key={`tag_${i}`} />;
            })}
        </Box>
        <Typography variant='body1'>{post.body}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' color='secondary'>
          <Link to={`/posts/${post.id}/edit`}>Ändra</Link>
        </Button>
      </CardActions>
    </Card>
  );
}

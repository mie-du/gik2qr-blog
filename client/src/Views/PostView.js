import {
  Grid,
  Typography,
  Fab,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip
} from '@mui/material';

import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';

import { toDateTimeString } from '../Helpers/formating';
import { PlaceholderAvatar } from '../Helpers/components';
import { Box } from '@mui/system';

export default function PostView() {
  const post = {
    content: {
      id: 4,
      title: 'En post',
      body: 'Nam commodi velit harum. Culpa ratione enim aliquid neque et. Reprehenderit dolores numquam unde aliquam voluptas perferendis.\n\nUt nobis similique nihil velit asperiores doloremque nobis. Dolores rerum non consectetur et iste fugiat. Ut quaerat non tempore.\n\nSit eligendi corporis quo id quibusdam quam unde alias. Maiores ut et corrupti quis quibusdam velit qui et. In quod ea consequuntur consequatur.\n\nVel quia quia neque alias impedit autem doloremque sint. Minima autem harum quidem provident et consequuntur non. Enim voluptatem ab ipsa. Voluptatem corrupti alias sit.',
      imageUrl: 'https://picsum.photos/id/1/200/',
      createdAt: '2021-12-28T15:01:25.000Z',
      updatedAt: '2021-12-28T15:01:25.000Z'
    },
    author: {
      id: 1,
      firstName: 'Mikaela',
      lastName: 'Hedberg',
      username: 'termedea',
      email: 'mie@du.se',
      imageUrl: 'https://picsum.photos/seed/picsum/200/200'
    },
    tags: [
      {
        id: 4,
        name: 'tag'
      },
      {
        id: 5,
        name: 'längretag'
      },
      {
        id: 6,
        name: 'tjoho'
      }
    ],
    comments: [
      {
        id: 1,
        title: 'Det finns mycket att säga om det jär',
        body: 'Det är verkligen förjävligt!',
        createdAt: '2021-12-28T15:56:23.000Z',
        updatedAt: '2021-12-28T15:56:23.000Z',
        author: {
          id: 1,
          firstName: 'Mikaela',
          lastName: 'Hedberg',
          imageUrl: 'https://picsum.photos/seed/picsum/200/200'
        }
      },
      {
        id: 2,
        title: 'Det finns mycket att säga om det jär',
        body: 'Äh skärp dig!',
        createdAt: '2021-12-28T15:57:15.000Z',
        updatedAt: '2021-12-28T15:57:15.000Z',
        author: {
          id: 2,
          firstName: 'Tobias',
          lastName: 'Wetterskog',
          imageUrl: 'https://picsum.photos/seed/picsum/200/200'
        }
      }
    ]
  };

  const { id, title, body, imageUrl, createdAt, updatedAt } =
    post?.content || {};
  const { author, comments, tags } = post || {};

  return (
    <>
      {post ? (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '2rem',
              marginBottom: '.3rem'
            }}>
            <Link to={`/posts/${id}/edit`}>
              <Fab size='small' color='secondary' aria-label='edit'>
                <EditIcon />
              </Fab>
            </Link>
            <Typography variant='h2'>{title}</Typography>
          </Box>
          <Grid container justifyContent='space-between' sx={{ width: '100%' }}>
            <Grid item>
              {imageUrl ? (
                <img src={imageUrl} alt='Bild för inlägg' />
              ) : (
                <img
                  src={`${process.env.PUBLIC_URL}/images/img-placeholder.svg`}
                  alt='Ingen bild tillgänglig'
                />
              )}
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid
                container
                spacing={2}
                alignItems='center'
                sx={{ marginBottom: '1rem;' }}>
                <Grid item>
                  <PlaceholderAvatar person={author} />
                </Grid>

                <Grid item>
                  <Typography component='p'>
                    {`Författare: ${author.firstName} (${author.username})`}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>
                    {`Publicerat: ${toDateTimeString(createdAt)} 
                    `}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem' }}>
                    {`Senast uppdaterat: ${toDateTimeString(updatedAt)}`}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant='body1'>{body}</Typography>
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
            </Grid>
            <Grid item xs={12}>
              <Typography component='h4' sx={{ fontSize: '1.5rem' }}>
                Kommentarer
              </Typography>
              <Accordion>
                <AccordionSummary
                  sx={{ backgroundColor: 'primary.light' }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'>
                  <Typography>Lägg till kommentar</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography component='p' variant='body2'>
                    Kommenterar som: {author.firstName}
                  </Typography>
                  <TextField
                    variant='filled'
                    name='comment'
                    fullWidth
                    rows='3'
                    multiline
                    label='Kommentar'
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: '1rem'
                    }}>
                    <Button
                      endIcon={<SendIcon />}
                      variant='contained'
                      size='large'>
                      Skicka
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>

              <List>
                {comments &&
                  comments.map((comment) => {
                    return (
                      <ListItem divider key={`comment_${comment.id}`}>
                        <ListItemAvatar>
                          <PlaceholderAvatar person={comment.author} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment.title}
                          secondary={comment.body}></ListItemText>
                      </ListItem>
                    );
                  })}
              </List>
            </Grid>
          </Grid>
        </>
      ) : (
        <Typography>Fetching users...</Typography>
      )}
    </>
  );
}

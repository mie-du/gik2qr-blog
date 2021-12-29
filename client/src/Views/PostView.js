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

export default function PostView({ post }) {
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
                    console.log(comment);
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
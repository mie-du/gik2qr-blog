import {
  Grid,
  Typography,
  Fab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button
} from '@mui/material';

import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import EditableResourceService from '../Services/EditableResourceService';
import ResourceService from '../Services/ResourceService';
import { toDateTimeString } from '../Helpers/formating';
import { PlaceholderAvatar } from '../Components/small';
import { Box } from '@mui/system';
import CommentEdit from '../Components/CommentEdit';
import CommentList from '../Components/CommentList';

export default function PostView(props) {
  const post = props?.post;
  console.info('%c--- Component: PostView ---', 'color:lime', post);

  if (post && !post['error']) {
    const { id, title, body, imageUrl, createdAt, updatedAt } = post.content;
    const { author, tags } = post;
    return (
      <>
        <Grid
          container
          justifyContent='space-between'
          spacing={5}
          width={{ xs: '100%', lg: '75%' }}
          mx={{ xs: 2, lg: 'auto' }}>
          <Grid item>
            {imageUrl ? (
              <img
                style={{ maxWidth: '200px' }}
                src={imageUrl}
                alt='Bild för inlägg'
              />
            ) : (
              <img
                src={`${process.env.PUBLIC_URL}/images/img-placeholder.svg`}
                alt='Ingen bild tillgänglig'
                style={{ maxWidth: '200px' }}
              />
            )}
          </Grid>
          <Grid item xs={12} xl={9}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                marginBottom: '.3rem'
              }}>
              <Link to={`/posts/${id}/edit`}>
                <Fab size='small' color='secondary' aria-label='edit'>
                  <EditIcon />
                </Fab>
              </Link>
              <Typography variant='h2'>{title}</Typography>
            </Box>
            <Grid
              container
              spacing={2}
              alignItems='center'
              sx={{ marginBottom: '1rem;' }}>
              <Grid item>
                <PlaceholderAvatar person={author} />
              </Grid>

              <Grid item>
                <Link to={`/users/${author.id}`}>
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
                </Link>
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
                <EditableResourceService
                  {...props}
                  resourcePath={`/posts/${id}/addComment`}
                  resourceName='comment'
                  resourceId=''
                  pathExtras=''>
                  <CommentEdit />
                </EditableResourceService>
              </AccordionDetails>
            </Accordion>
            <ResourceService
              {...props}
              resourcePath={`/posts/${id}/getComments`}
              resourceName='comments'
              resourceId=''
              pathExtras=''>
              <CommentList />
            </ResourceService>
          </Grid>
        </Grid>
      </>
    );
  } else return <Typography>Fetching users...</Typography>;
}

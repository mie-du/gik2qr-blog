import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@mui/material';
import React from 'react';

export default function UserView({ user }) {
  const { firstName, lastName, username, email, imgUrl } = user || {};
  return (
    <div>
      {user ? (
        <>
          <Typography variant='title'>Min profil</Typography>

          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component='img'
              height='140'
              image='/static/images/cards/contemplative-reptile.jpg'
              alt='green iguana'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='div'>
                Lizard
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small'>Share</Button>
              <Button size='small'>Learn More</Button>
            </CardActions>
          </Card>
        </>
      ) : (
        'No user found'
      )}
    </div>
  );
}

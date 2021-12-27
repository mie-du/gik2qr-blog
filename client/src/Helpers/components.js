import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React from 'react';

export function PlaceholderAvatar({ person }) {
  console.log(person);
  return (
    <>
      {person.imageUrl ? (
        <Avatar
          src={person.imageUrl}
          alt={`Bild på ${person.firstName} ${person.lastName}`}
          aria-label='Author image'
        />
      ) : (
        <Avatar
          sx={{ bgcolor: deepPurple[500] }}
          aria-label='Author image placeholder'>
          {`${person.firstName.substring(0, 1)}${person.lastName.substring(
            0,
            1
          )}`}
        </Avatar>
      )}
    </>
  );
}

import { Avatar, Box } from '@mui/material';
import { amber, brown, orange } from '@mui/material/colors';

export const PlaceHolderImage = ({ source }) => {
  return source.imageUrl ? (
    <img
      src={source.imageUrl}
      alt={source.title}
      style={{ width: '200px', height: '200px' }}
    />
  ) : (
    <Box
      sx={{
        width: 200,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: orange['A100'],
        border: `1px solid ${brown[500]}`
      }}>
      Bild saknas
    </Box>
  );
};

export const PlaceHolderAvatar = ({ user }) => {
  {
    return user.imageUrl ? (
      <Avatar
        src={user.imageUrl}
        alt={`Bild på ${user.username}`}
        aria-label='Author image'
      />
    ) : (
      <Avatar
        sx={{ bgcolor: amber[800] }}
        aria-label='Author image placeholder'>
        {createAvatarString(user)}
      </Avatar>
    );
  }
};

const createAvatarString = (user) => {
  if (user.firstName && user.lastName) {
    return `${user.firstName.substring(0, 1)}${user.lastName.substring(0, 1)}`;
  } else if (user.username) {
    return user.username.substring(0, 1);
  }
  return '?';
};

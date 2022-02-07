import React, { useEffect, useState } from 'react';
import api from '../server/api';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PostDetail(props) {
  const paramsId = props.match.params.id;
  const id = !isNaN(paramsId) ? paramsId : 0;

  const [post, setPost] = useState({});
  useEffect(() => {
    api.get(`posts/${id}`).then((result) => {
      if (result.status === 200) setPost(result.data);
      if (result.status === 204) {
        // modal ?
        console.log('Inget inlägg hittades');

        //på delay?
        window.location.href = '/posts/';
      }
    });
  }, [id]);

  return (
    <>
      {post && post.author ? (
        <div>
          <img src={post.imageUrl} />
          {<p>Skrivet av: {post.author.username}</p>}
          <p>{post.title}</p>
          <p>{post.body}</p>
          <Button variant='contained' color='primary'>
            <Link to={`/posts/${post.id}/edit`}>Ändra</Link>
          </Button>
        </div>
      ) : (
        <p>Laddar</p>
      )}
    </>
  );
}

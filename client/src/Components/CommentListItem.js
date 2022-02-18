import React from 'react';

export default function CommentListItem({ comment }) {
  console.log(comment);
  return (
    <li>
      <p>Skriven av: {comment.author} </p>

      <p>{comment.title}</p>
      <p>{comment.body}</p>
    </li>
  );
}

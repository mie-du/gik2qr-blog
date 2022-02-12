import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import PostItemSmall from '../Components/PostItemSmall';

export default function Posts() {
  const postModel = new PostModel('posts');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postModel.getAll().then((posts) => {
      setPosts(posts);
    });
  }, []);
  console.log(posts);
  return (
    <ul>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <li key={`post_${post.id}`}>
              <PostItemSmall post={post} />
            </li>
          );
        })}
    </ul>
  );
}

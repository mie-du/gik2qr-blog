import React, { useState, useEffect } from 'react';
import PostModel from '../models/PostsModel';
import PostItemSmall from '../Components/PostItemSmall';

export default function Posts(props) {
  const postModel = new PostModel('posts');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postModel.getAll().then((posts) => {
      setPosts(posts);
    });
  }, []);

  return (
    <ul>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <li key={`post_${post.id}`}>
              <PostItemSmall {...props} post={post} />
            </li>
          );
        })}
    </ul>
  );
}

import React from 'react';
import UserModel from './UserModel';
export default function UserList() {
  const model = new UserModel();

  model.getAll().then((result) => {
    console.log(result.data);
  });

  return <div>User</div>;
}

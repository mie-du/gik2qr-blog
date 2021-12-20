import api from './api';

export default class UserModel {
  apiPath = 'users';

  getAll() {
    const data = api.get(this.apiPath).then((data) => data);
    return data;
  }

  createUser(user) {
    console.log(user);
    const data = api.post(this.apiPath, user).then((data) => data);
    return data;
  }

  updateUser(user) {
    const data = api.put(this.apiPath, user).then((data) => data);
    return data;
  }
}

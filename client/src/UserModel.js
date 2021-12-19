import api from './api';

export default class UserModel {
  apiPath = 'users';

  getAll() {
    return api.get(`${this.apiPath}`);
  }

  createUser(user) {
    this.users.push(user);
  }
}

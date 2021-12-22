import Api from '../Api';

export default class UserModel {
  constructor() {
    this.api = new Api('users');
  }

  getAll() {
    const data = this.api.get().then((data) => data);
    return data;
  }

  createUser(user) {
    const data = this.api.post(user).then((data) => data);
    return data;
  }

  updateUser(user) {
    const data = this.api.put(user).then((data) => data);
    return data;
  }

  deleteUser(user) {
    const data = this.api.delete(user).then((data) => data);
    return data;
  }
}

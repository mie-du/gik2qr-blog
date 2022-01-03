import Api from '../api/Api';

export default class UserModel {
  constructor() {
    this.api = new Api('users');
  }

  getAll() {
    const data = this.api.get().then((data) => data);
    return data;
  }

  getOne(id) {
    const data = this.api.getById(id).then((data) => data);
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

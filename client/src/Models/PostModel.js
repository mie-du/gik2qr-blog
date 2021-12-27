import Api from '../Api';

export default class PostModel {
  constructor() {
    this.api = new Api('posts');
  }

  getAll() {
    const data = this.api.get().then((data) => data);
    return data;
  }
  getSummaryAll() {
    const data = this.api.get('summary').then((data) => data);
    return data;
  }

  getSummaryById(id) {
    const data = this.api.get(`${id}/summary`).then((data) => data);
    return data;
  }

  createPost(post) {
    const data = this.api.post(post).then((data) => data);
    return data;
  }

  updatePost(post) {
    const data = this.api.put(post).then((data) => data);
    return data;
  }

  deletePost(post) {
    const data = this.api.delete(post).then((data) => data);
    return data;
  }
}

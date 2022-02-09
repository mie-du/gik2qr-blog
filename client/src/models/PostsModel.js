import api from '../api';

export default class PostModel {
  resourceUrl = '';
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  async getAll() {
    const result = await api.get(this.resourceUrl);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return [];
  }

  async getById(id) {
    const result = await api.get(`${this.resourceUrl}/${id}`);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }
}

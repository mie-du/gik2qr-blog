import api from '../api';

export default class ResourceModel {
  resourceUrl = '';
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  async getAll(url = this.resourceUrl) {
    try {
      const result = await api.get(url);
      if (result.status === 200) return result.data;
      else {
        console.log(result.status);
        console.log(result.data);
      }
      return [];
    } catch (e) {
      console.log(e);
    }
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

  async update(resource) {
    const result = await api.put(this.resourceUrl, resource);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async create(resource) {
    const result = await api.post(this.resourceUrl, resource);
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async remove(id) {
    const result = await api.delete(this.resourceUrl, { data: { id } });
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  async addComment(id, resource) {
    const result = await api.post(
      `${this.resourceUrl}/${id}/addComment`,
      resource
    );
    console.log(result);
    if (result.status === 200) return result.data;
    else {
      console.log('error');
    }
    return {};
  }
}

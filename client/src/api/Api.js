/* Api.js
  Code for general CRUD-operations with promises.
  Generally written (not necesarily users)
*/
class Api {
  baseUrl = 'http://localhost:5001';
  constructor(path = '') {
    this.url = this.baseUrl + (path ? `/${path}` : '');
  }
  //R=GET
  //Get All, converted to JSON for cleanest possible result to work with
  get(path = '') {
    //first response returns data stream, needs to be converted to json.
    const fullUrl = this.url + path;

    const result = fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    return result;
  }

  getById(id) {
    const completeUrl = `${this.url}/${id}`;
    const result = fetch(completeUrl)
      .then((response) => response.json())
      .then((data) => data);

    return result;
  }

  //C=POST
  //Send object to api for creation.
  //Returns the response, which contains information about the created object.
  post(path = '', data) {
    const JSONData = JSON.stringify(data);
    console.log(JSONData);
    const fullUrl = this.url + path;
    console.log(fullUrl);

    const result = fetch(fullUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSONData
    })
      .then((response) => response.json())
      .then((data) => data);

    return result;
  }

  //U=PUT
  put(path = '', data) {
    const JSONData = JSON.stringify(data);
    console.log(JSONData);
    const fullUrl = this.url + path;
    const result = fetch(fullUrl, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSONData
    })
      .then((response) => response.json())
      .then((data) => data);

    return result;
  }

  //D=DELETE
  delete(path = '', data) {
    const JSONData = JSON.stringify(data);
    console.log(JSONData);
    const fullUrl = this.url + path;
    const result = fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSONData
    })
      .then((response) => response.json())
      .then((data) => data);

    return result;
  }
}

module.exports = Api;

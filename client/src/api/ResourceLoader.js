import React, { Component } from 'react';
import Api from './Api';
export default class ResourceLoader extends Component {
  constructor(props) {
    super(props);
    this.resourceName = this.props.resourceName;
    this.state = { [this.resourceName]: null };
    this.url = this.cleanUrl(this.props.match.url, this.props.pathExtras);
    console.log('Resourceloader url', this.fullUrl);
    this.api = new Api();
  }
  componentDidUpdate() {
    //resource name has changed
    if (this.resourceName !== this.props.resourceName) {
      this.resourceName = this.props.resourceName;
      this.url = this.cleanUrl(this.props.match.url, this.props.pathExtras);
      //fetch resource again
      this.fetchResource();
    }
  }

  componentDidMount() {
    this.fetchResource();
  }

  cleanUrl(url, pathExtras) {
    //if user accedently adds / at the end of the url
    if (url.length > 1 && url.lastIndexOf('/') === url.length - 1)
      url = url.substring(0, url.length - 1);
    return `${url}${pathExtras}`;
  }

  fetchResource() {
    this.api.get(this.url).then((result) => {
      this.setState({ [this.resourceName]: result.data });
    });
  }
  render() {
    console.log('State while rendering', this.state);
    console.log('resource to send', this.state[this.resourceName]);
    return (
      <>
        {React.Children.map(this.props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              [this.resourceName]: this.state[this.resourceName]
            });
          }

          return child;
        })}
      </>
    );
  }
}

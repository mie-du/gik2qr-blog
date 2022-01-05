import React, { Component } from 'react';
import Api from '../api/Api';
export default class ResourceLoader extends Component {
  static defaultProps = {
    pathExtras: '',
    resourceId: 0
  };

  constructor(props) {
    super(props);
    this.state = { [this.resourceName]: null };
    //saving props to member variables
    this.resourceName = this.props.resourceName;
    this.resourcePath = this.props.resourcePath;
    this.resourceId = this.props.resourceId;

    this.fetchUrl = this.getFetchUrl(
      this.resourcePath,
      this.resourceId,
      this.props.pathExtras
    );

    console.info('%c---Component: Resourceloader ---', 'color:pink', this.url);
    this.api = new Api();
  }
  componentDidUpdate() {
    const currentResourceId = this.props.resourceId;
    //if url
    if (this.resourceId !== currentResourceId) {
      this.resourceName = this.props.resourceName;
      this.resourcePath = this.props.resourcePath;
      this.resourceId = this.props.resourceId;

      this.fetchUrl = this.getFetchUrl(
        this.props.resourcePath,
        this.props.resourceId,
        this.props.pathExtras
      );

      this.fetchResource();
    }
  }
  componentDidMount() {
    this.fetchResource();
  }
  getFetchUrl(path, pathId, pathExtras) {
    console.log('Creating fetch-url', path, pathId, pathExtras);
    const id = pathId && !isNaN(pathId) ? pathId : '';
    return `${path}/${id}${pathExtras}`;
  }

  fetchResource() {
    this.api.get(this.fetchUrl).then((result) => {
      this.setState({ [this.resourceName]: result.data });
    });
  }
  render() {
    return (
      <>
        {React.Children.map(this.props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              [this.resourceName]: this.state[this.resourceName],
              ...this.props
            });
          }

          return child;
        })}
      </>
    );
  }
}

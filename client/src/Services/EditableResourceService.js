import React, { Component } from 'react';
import Api from '../api/Api';

export default class EditableResourceService extends Component {
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

    console.info(
      '%c---Component: EditableResourceService ---',
      'color:pink',
      this.fetchUrl
    );

    this.api = new Api();
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  getFetchUrl(path, pathId, pathExtras) {
    console.log('Creating fetch-url', path, pathId, pathExtras);
    const id = pathId && !isNaN(pathId) ? pathId : '';
    return `${path}/${id}${pathExtras}`;
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
  fetchResource() {
    if (this.resourceId) {
      this.api.get(this.fetchUrl).then((result) => {
        this.setState({ [this.resourceName]: result.data });
      });
    }
    this.setState({ [this.resourceName]: {} });
  }

  onChange(field) {
    console.log(this.resourceName);
    this.setState({
      [this.resourceName]: {
        ...this.state[this.resourceName],
        [field.name]: field.value
      }
    });
  }

  onSave() {
    console.log(`Saving to ${this.resourcePath}`);
    if (this.state[this.resourceName].id) {
      this.api
        .put(this.resourcePath, this.state[this.resourceName])
        .then((result) => {
          window.location.href = `${this.resourcePath}/${this.resourceId}`;
        });
    } else {
      this.api
        .post(this.resourcePath, this.state[this.resourceName])
        .then((result) => {
          console.log(result);

          window.location.href = `${this.resourcePath}/${result.data.id}`;
        });
    }
  }

  onDelete() {
    console.log(
      `Deleting resource at to ${this.resourcePath}`,
      this.state[this.resourceName]
    );
    this.api
      .delete(this.resourcePath, { id: this.state[this.resourceName].id })
      .then(() => {
        window.location.href = `${this.resourcePath}`;
      });
  }

  render() {
    return (
      <>
        {React.Children.map(this.props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              [this.resourceName]: this.state[this.resourceName],
              changeResource: this.onChange,
              saveResource: this.onSave,
              deleteResource: this.onDelete
            });
          }

          return child;
        })}
      </>
    );
  }
}

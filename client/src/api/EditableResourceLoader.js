import React, { Component } from 'react';
import Api from './Api';
export default class EditableResourceLoader extends Component {
  constructor(props) {
    super(props);
    //fetching resourcename prop, for state and prop to child.
    this.resourceName = this.props.resourceName;
    //state with variable resource name
    this.state = { [this.resourceName]: {} };
    //prop for path (different from regular resourceloader)
    this.pathExtras = this.props.pathExtras || '';
    console.log('Path extras', this.pathExtras);
    this.path = this.props.path;
    //checking if pathid exists and is not "new"
    this.pathId = this.props.match.params.id;

    this.id = this.pathId && this.pathId !== 'new' ? this.pathId : null;
    this.fullUrl = `${this.path}/${this.id}/${this.pathExtras}`;
    console.info(
      '%c---Component: EditableResourceLoader ---',
      'color:pink',
      this.fullUrl
    );
    this.api = new Api();
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }
  componentDidUpdate() {
    const currentParams = this.props.match.params.id;
    //if params changed
    if (currentParams !== this.id) {
      this.id = currentParams;
      this.fullUrl = `${this.path}/${this.id}/${this.pathExtras}`;
      this.fetchResource();
    }
  }
  componentDidMount() {
    this.fetchResource();
  }
  fetchResource() {
    if (this.id) {
      this.api.get(this.fullUrl).then((result) => {
        this.setState({ [this.resourceName]: result.data });
      });
    }
    this.setState({ [this.resourceName]: {} });
  }
  onChange(field) {
    this.setState({
      [this.resourceName]: {
        ...this.state[this.resourceName],
        [field.name]: field.value
      }
    });
  }

  onSave() {
    console.log(`Saving to ${this.path}`);
    if (this.state[this.resourceName].id) {
      this.api.put(this.path, this.state[this.resourceName]).then((result) => {
        console.log(result);
      });
    } else {
      this.api.post(this.path, this.state[this.resourceName]).then((result) => {
        console.log(result);
      });
    }
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
              ...this.props
            });
          }

          return child;
        })}
      </>
    );
  }
}

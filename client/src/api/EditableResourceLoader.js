import React, { Component } from 'react';
import Api from './Api';
export default class EditableResourceLoader extends Component {
  constructor(props) {
    super(props);
    //fetching resourcename prop, for state and prop to child.
    this.resourceName = this.props.resourceName;
    //state with variable resource name
    this.state = { [this.resourceName]: null };
    //prop for path (different from regular resourceloader)
    this.path = this.props.path;
    //checking if pathid exists and is not "new"
    this.pathId = this.props.match.params.id;
    this.id = this.pathId && this.pathId !== 'new' ? this.pathId : null;

    this.api = new Api();
  }

  componentDidMount() {
    if (this.id) {
      this.api.get(`${this.path}/${this.id}`).then((result) => {
        this.setState({ [this.resourceName]: result.data });
      });
    }
  }

  render() {
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

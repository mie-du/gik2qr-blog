import React, { Component } from 'react';
import Api from './Api';
export default class ResourceLoader extends Component {
  constructor(props) {
    super(props);
    this.resourceName = this.props.resourceName;

    this.state = { [this.resourceName]: null };
    this.url = `${this.props.match.url}${this.props.pathExtras}`;
    console.log('Resourceloader url', this.url);
    this.api = new Api();
  }

  componentDidMount() {
    this.api.get(this.url).then((result) => {
      console.log(result);
      this.setState({ [this.resourceName]: result.data });
    });
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

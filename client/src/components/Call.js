import React from 'react';

export default class Call extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Call</h1>
      </div>
    );
  }
}

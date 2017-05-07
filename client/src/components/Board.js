import React from 'react';

export default class Board extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Board</h1>
      </div>
    );
  }
}

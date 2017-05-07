import React, { Component } from 'react';
import ListCardContainer from './ListCardContainer';

export default class ListMainContainer extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  render() {
    const {list} = this.props;
    return (
      <div className="list-container">
        <h1 className="list-container-header">Header</h1>
        {
          list.map(item => (
            <ListCardContainer list={item}/>
          ))
        }

      </div>
    )
  }
}


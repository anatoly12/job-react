import React from 'react';
// import Container from './Container';
import ListCardContainer from './ListCardContainer';

export default class Board extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      list: [
        { 
          header: "Interested",
          cards: [
            { id: 1, company: "Item 1", title: "software engineer" },
            { id: 2, company: "Item 2", title: "software engineer" },
            { id: 3, company: "Item 3", title: "software engineer" }
          ]
        },
        {
          header: "Applied",
          cards: [
            { id: 4, company: "Item 4", title: "software engineer"},
            { id: 5, company: "Item 5", title: "software engineer" },
            { id: 6, company: "Item 6", title: "software engineer" }
          ]
        },
        {

          header: "Phone",
          cards: [
            { id: 7, company: "Item 7", title: "software engineer" },
            { id: 8, company: "Item 8", title: "software engineer" },
            { id: 9, company: "Item 9", title: "software engineer" }
          ]
        },
        {
          header: "On-Site",
          cards: [
            { id: 10, company: "Item 7", title: "software engineer" },
            { id: 11, company: "Item 8", title: "software engineer" },
            { id: 12, company: "Item 9", title: "software engineer" }
          ]
        },
        {
          header: "Offer",
          cards: [
            { id: 13, company: "Item 7", title: "software engineer" },
            { id: 14, company: "Item 8", title: "software engineer" },
            { id: 15, company: "Item 9", title: "software engineer" }
          ]
        }
      ]
    }
  }

  render() {    
    return (
      <div className="job-board">
      {this.state.list.map( (listcontainer, i) => (
        <ListCardContainer id={i} list={listcontainer.cards} header={listcontainer.header}/>
      ))}
      </div>
    );
  }
}
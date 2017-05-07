import React from 'react';
// import Container from './Container';
import ListCardContainer from './ListCardContainer';

export default class Board extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const listOne = [
      { id: 1, company: "Item 1", title: "software engineer" },
      { id: 2, company: "Item 2", title: "software engineer" },
      { id: 3, company: "Item 3", title: "software engineer" }
    ];
 
    const listTwo = [
      { id: 4, company: "Item 4", title: "software engineer"},
      { id: 5, company: "Item 5", title: "software engineer" },
      { id: 6, company: "Item 6", title: "software engineer" }
    ];
 
    const listThree = [
      { id: 7, company: "Item 7", title: "software engineer" },
      { id: 8, company: "Item 8", title: "software engineer" },
      { id: 9, company: "Item 9", title: "software engineer" }
    ];    

    const listFour = [
      { id: 10, company: "Item 7", title: "software engineer" },
      { id: 11, company: "Item 8", title: "software engineer" },
      { id: 12, company: "Item 9", title: "software engineer" }
    ];

    const listFive = [
      { id: 13, company: "Item 7", title: "software engineer" },
      { id: 14, company: "Item 8", title: "software engineer" },
      { id: 15, company: "Item 9", title: "software engineer" }
    ];

    return (
      <div className="job-board">
        <ListCardContainer id={1} list={listOne} header="Interested"/>
        <ListCardContainer id={2} list={listTwo} header="Applied"/>
        <ListCardContainer id={3} list={listThree} header="Phone Interview"/>
        <ListCardContainer id={3} list={listFour} header="On-Site"/>
        <ListCardContainer id={3} list={listFive} header="Offer"/>
      </div>
    );
  }
}

import React from 'react';
import ListCardContainer from './ListCardContainer';
import util from '../../../lib/util';

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
            { id: 1, company: "Angel List", title: "software engineer" },
            { id: 2, company: "Airbnb", title: "software engineer" },
            { id: 3, company: "Apple", title: "software engineer" }
          ]
        },
        {
          header: "Applied",
          cards: [
            { id: 4, company: "Tesla", title: "software engineer"},
            { id: 5, company: "Microsoft", title: "software engineer" },
            { id: 6, company: "Lyft", title: "software engineer" }
          ]
        },
        {
          header: "Phone",
          cards: [
            { id: 7, company: "Angel Hack", title: "software engineer" },
            { id: 8, company: "SparkPost", title: "software engineer" },
            { id: 9, company: "Radix", title: "software engineer" }
          ]
        },
        {
          header: "On-Site",
          cards: [
            { id: 10, company: "Amazon", title: "software engineer" },
            { id: 11, company: "Philz", title: "software engineer" },
            { id: 12, company: "Blue Bottle", title: "software engineer" }
          ]
        },
        {
          header: "Offer",
          cards: [
            { id: 13, company: "Yelp", title: "software engineer" },
            { id: 14, company: "Twitter", title: "software engineer" },
            { id: 15, company: "IBM", title: "software engineer" }
          ]
        }
      ]
    }
  }

  componentWillMount() {
    return util.fetchJobPosting()
    .then( result => { 
      this.setState({ list: result }) 
    });
  }

  render() {    
    return (
      <div className="job-board">
      {this.state.list.map( listcontainer => (
        <ListCardContainer
          key={Math.floor(Math.random()*100)} 
          id={Math.floor(Math.random()*100)} 
          list={listcontainer.cards} 
          header={listcontainer.header}/>
      ))}
      </div>
    );
  }
}
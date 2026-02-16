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

    this.boardNode = null;
    this.handleBoardInteraction = this.handleBoardInteraction.bind(this);
    this.setBoardNode = this.setBoardNode.bind(this);
  }

  componentWillMount() {
    return util.fetchJobPosting()
    .then( result => { 
      if (Array.isArray(result) && result.length) {
        this.setState({ list: result }, () => this.trackJobPostingAnalytics(result));
        return;
      }

      this.trackAnalyticsEvent('job_postings_load_empty', {
        reason: 'No job postings returned from API'
      });
    })
    .catch(error => {
      this.trackAnalyticsEvent('job_postings_load_failed', {
        message: error && error.message ? error.message : 'Unknown error'
      });
    });
  }

  setBoardNode(node) {
    this.boardNode = node;
  }

  trackAnalyticsEvent(eventName, payload = {}) {
    const hasWindow = typeof window !== 'undefined';
    const analytics = hasWindow && window.analytics && typeof window.analytics.track === 'function'
      ? window.analytics
      : null;

    if (analytics) {
      analytics.track(eventName, payload);
      return;
    }

    const isDev = typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production';
    if (isDev) {
      console.info(`[Analytics] ${eventName}`, payload); // eslint-disable-line no-console
    }
  }

  trackJobPostingAnalytics(list) {
    if (!Array.isArray(list) || !list.length) {
      return;
    }

    const breakdown = list.map(column => {
      const cardCount = Array.isArray(column.cards) ? column.cards.length : 0;
      return {
        name: column.header || 'unknown',
        count: cardCount
      };
    });

    const totalJobs = breakdown.reduce((sum, column) => sum + column.count, 0);

    this.trackAnalyticsEvent('job_postings_loaded', {
      totalLists: list.length,
      totalJobs,
      breakdown
    });
  }

  normalizeText(value) {
    return (value || '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  getNodeIndex(node) {
    if (!node || !node.parentNode) {
      return -1;
    }

    return Array.prototype.indexOf.call(node.parentNode.children, node);
  }

  findParentWithClass(node, className) {
    let current = node;
    while (current) {
      if (current.classList && current.classList.contains(className)) {
        return current;
      }

      if (current === this.boardNode) {
        break;
      }

      current = current.parentNode;
    }

    return null;
  }

  handleBoardInteraction(event) {
    if (!this.boardNode || !this.state || !Array.isArray(this.state.list)) {
      return;
    }

    const payload = { action: event.type };
    const listNode = this.findParentWithClass(event.target, 'job-board-containers');
    const cardNode = this.findParentWithClass(event.target, 'job-board-card');

    if (listNode) {
      const headerNode = listNode.querySelector('.job-board-containers-header');
      const headerText = headerNode ? headerNode.textContent : '';
      const normalizedHeader = this.normalizeText(headerText);
      const listData = this.state.list.find(column => this.normalizeText(column.header) === normalizedHeader);

      payload.list = listData ? listData.header : headerText.trim();

      if (cardNode) {
        payload.target = 'card';
        const cardIndex = this.getNodeIndex(cardNode);
        payload.cardIndex = cardIndex;

        if (listData && Array.isArray(listData.cards) && cardIndex > -1 && listData.cards[cardIndex]) {
          const cardData = listData.cards[cardIndex];
          payload.jobId = cardData.id || cardData._id;
          payload.company = cardData.companyName || cardData.company;
          payload.title = cardData.jobTitle || cardData.title;
        }
      } else {
        payload.target = 'list';
      }
    } else {
      payload.target = 'board';
    }

    this.trackAnalyticsEvent('job_board_interaction', payload);
  }

  render() {    
    return (
      <div 
        className="job-board"
        onClick={this.handleBoardInteraction}
        ref={this.setBoardNode}>
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

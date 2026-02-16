import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import analytics from '../../../lib/analytics';

class ListCardContainer extends Component {

  constructor(props) {
    super(props);   
    this.state = { cards: props.list };
  }

  pushCard(card) {
    this.setState(update(this.state, {
      cards: {
        $push: [ card ]
      }
    }));
  }

  removeCard(index) {   
    this.setState(update(this.state, {
      cards: {
        $splice: [
          [index, 1]
        ]
      }
    }));
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;   
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {
    const { cards } = this.state;
    const { header, canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    const backgroundColor = isActive ? 'lightgreen' : '#FFF';

    return connectDropTarget(
      <div className='job-board-containers'>
        <h1 className='job-board-containers-header'>{header}</h1>
        {cards.map((card, i) => {
          return (
            <Card 
              key={card.id}
              index={i}
              listId={this.props.id}
              listHeader={header}
              card={card}                           
              removeCard={this.removeCard.bind(this)}
              moveCard={this.moveCard.bind(this)} />
          );
        })}
      </div>
    );
  }
}

const cardTarget = {
  drop(props, monitor, component) {
    const { id, header } = props;
    const sourceObj = monitor.getItem();
    const movedToDifferentList = id !== sourceObj.listId;

    if (movedToDifferentList) {
      component.pushCard(sourceObj.card);

      if (header && header.toLowerCase() === 'applied') {
        analytics.trackJobApplication(sourceObj.card, {
          sourceBoard: sourceObj.listHeader,
          targetBoard: header,
          interaction: 'drag-and-drop',
        });
      }

      monitor.getItem().listId = id;
      monitor.getItem().listHeader = header;

      if (sourceObj.card) {
        sourceObj.card.boardName = header;
      }
    }

    return {
      listId: id,
    };
  }
};

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(ListCardContainer);

import React, { Component } from 'react';
import update from 'react/lib/update';
import Card from './Card';
import { DropTarget } from 'react-dnd';
import { trackJobBoardEvent } from '../../../lib/analytics';

class ListCardContainer extends Component {

  constructor(props) {
    super(props);   
    this.state = { cards: props.list };
  }

  logCardMove(card, sourceListId, destinationListId, sourceHeader, destinationHeader) {
    trackJobBoardEvent('job_board_card_moved', {
      cardId: card.id || card._id,
      companyName: card.companyName,
      jobTitle: card.jobTitle,
      fromListId: sourceListId,
      toListId: destinationListId,
      fromListHeader: sourceHeader,
      toListHeader: destinationHeader
    });
  }

  logCardReorder(card, fromIndex, toIndex, listHeader) {
    trackJobBoardEvent('job_board_card_reordered', {
      cardId: card.id || card._id,
      companyName: card.companyName,
      jobTitle: card.jobTitle,
      fromIndex,
      toIndex,
      listHeader
    });
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
  drop(props, monitor, component ) {
    const { id } = props;
    const sourceObj = monitor.getItem();    
    const targetHeader = props.header;

    if ( id !== sourceObj.listId ) {
      const updatedCard = Object.assign({}, sourceObj.card, { boardName: targetHeader });
      component.pushCard(updatedCard);
      component.logCardMove(updatedCard, sourceObj.listId, id, sourceObj.listHeader, targetHeader);
      monitor.getItem().card = updatedCard;
    } else if (sourceObj.initialIndex !== monitor.getItem().index) {
      component.logCardReorder(sourceObj.card, sourceObj.initialIndex, monitor.getItem().index, targetHeader);
    }

    return {
      listId: id
    };
  }
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(ListCardContainer);

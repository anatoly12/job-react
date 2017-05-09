import React, {Component, PropTypes} from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import flow from 'lodash/flow';
import JobCard from '../JobCard';

class Card extends Component {
  constructor(props) {
    super(props);
  
    this.state = {open: false};
    this.handleDialog = this.handleDialog.bind(this);
  }

  handleDialog() {
    console.log('handle toggleed');
    this.setState({
      open: !this.state.open 
    });
  }

  render() {
    const { card, isDragging, connectDragSource, connectDropTarget } = this.props;
    
    return connectDragSource(connectDropTarget(
      <div 
        className="job-board-card" 
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onClick={this.handleDialog}
        >
        <p className="company-name">{card.companyName}</p>
        <p className="job-title">{card.jobTitle}</p>
        <JobCard open={this.state.open} card={card} handleDialog={this.handleDialog}/>
      </div>
    ));
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index,
      listId: props.listId,
      card: props.card
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult(); 
 
    if ( dropResult && dropResult.listId !== item.listId ) {
      props.removeCard(item.index);
    }
  }
};

const cardTarget = {
 
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourceListId = monitor.getItem().listId;  
 
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }
 
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
 
    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
 
    // Determine mouse position
    const clientOffset = monitor.getClientOffset();
 
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;
 
    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
 
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }
 
    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }
 
    // Time to actually perform the action
    if ( props.listId === sourceListId ) {
      props.moveCard(dragIndex, hoverIndex);
 
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }   
  }
};

export default flow(
  DropTarget("CARD", cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource("CARD", cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))
)(Card);
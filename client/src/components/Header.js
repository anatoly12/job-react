import React from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom'

||||||| merged common ancestors

=======
>>>>>>> (fix) Fix merge routes
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

export default class Header extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { open: false }
    this.handleClose = this.handleClose.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleClose() {
    this.setState({open: false})
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  render() {
    return (
      <div>
        <AppBar
        title="RubberDuckies"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem 
          onTouchTap={this.handleClose}
          containerElement={<Link to="/board" />}
          primaryText="Job Board"
          />
          <MenuItem 
            onTouchTap={this.handleClose}
            containerElement={<Link to="/call" />}
            primaryText="Call"
          />
          <MenuItem 
            onTouchTap={this.handleClose}
            containerElement={<Link to="/job-card" />}
            primaryText="Job Card"
          />
          <MenuItem 
            onTouchTap={this.handleClose}
            containerElement={<Link to="/job-entry" />}
            primaryText="Job Entry"
          />
        </Drawer>
      </div>
    );
  }
}

import React, { PropTypes, Component } from 'react';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

export default class InterviewTab extends Component {
  constructor(props) {
      super(props);

      this.state = {
        interviewDate: null,
        interviewTime: null
      };
    }

  handleDateChange (event, date) {
    this.setState({
      interviewDate: date
    });
  }

  handleTimeChange (event, time) {
    this.setState({
      interviewTime: time
    });
  }

  submitInterviewTime () {
    console.log('submitting interview time');
    console.log('interviewDate: ', this.state.interviewDate);
    console.log('interviewTime: ', this.state.interviewTime);
    // add a day
    const {interviewDate, interviewTime} = this.state;
    interviewDate.setDate(interviewDate.getDate() - 1);
    // Add 1 week to date
    var followUpDate = new Date();
    followUpDate.setDate(interviewDate.getDate() + 5);

    // Reminder date is 1 day after
    // console.log('reminderDate: ', reminderDate);

    axios.post('/setReminder', {
      reminderDate: interviewDate,
      reminderTime: interviewTime,
      followUpDate: followUpDate
    })
    .then(function (response) {
      // TODO: Show snackbar as confirmation of reminder
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <br />
        <h1>InterviewTab!</h1>
        <DatePicker
          hintText="Date of Interview"
          value={this.state.interviewDate} 
          onChange={this.handleDateChange.bind(this)}
        />
        <TimePicker
          hintText="Time of Interview"
          onChange={this.handleTimeChange.bind(this)}
        />
        <RaisedButton label="Submit Interview Time" onClick={this.submitInterviewTime.bind(this)}/>
      </div>
    );
  }
}
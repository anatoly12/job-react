import React, { PropTypes, Component } from 'react';

import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { trackEvent } from '../../lib/analytics';

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

    const originalDate = this.state.interviewDate ? new Date(this.state.interviewDate.getTime()) : null;
    const interviewTime = this.state.interviewTime;

    if (!originalDate || !interviewTime) {
      trackEvent('Interview Reminder Failed', {
        reason: 'missing_fields'
      });
      return;
    }

    const reminderDate = new Date(originalDate.getTime());
    reminderDate.setDate(reminderDate.getDate() - 1);

    var followUpDate = new Date();
    followUpDate.setDate(reminderDate.getDate() + 5);

    axios.post('/setReminder', {
      reminderDate: reminderDate,
      reminderTime: interviewTime,
      followUpDate: followUpDate
    })
    .then(response => {
      // TODO: Show snackbar as confirmation of reminder
      console.log(response);
      trackEvent('Interview Reminder Submitted', {
        interviewDate: originalDate.toISOString(),
        reminderDate: reminderDate.toISOString(),
        hasFollowUp: true
      });
    })
    .catch(error => {
      console.log(error);
      trackEvent('Interview Reminder Failed', {
        reason: 'request_error',
        message: error && error.message ? error.message : 'unknown'
      });
    });
  }

  render() {
    return (
      <div>
        <br />
        <h1>Enter your interview date/time:</h1>
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

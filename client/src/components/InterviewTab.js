import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { analyticsEvent } from '../actions/index';

class InterviewTab extends Component {
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
    const {interviewDate, interviewTime} = this.state;
    interviewDate.setDate(interviewDate.getDate() - 1);
    var followUpDate = new Date();
    followUpDate.setDate(interviewDate.getDate() + 5);

    axios.post('/setReminder', {
      reminderDate: interviewDate,
      reminderTime: interviewTime,
      followUpDate: followUpDate
    })
    .then((response) => {
      console.log(response);
      this.props.dispatch(analyticsEvent('INTERVIEW_TIME_SUBMITTED', { interviewDate, interviewTime }));
    })
    .catch(function (error) {
      console.log(error);
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

export default connect()(InterviewTab);
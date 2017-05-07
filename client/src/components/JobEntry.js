import React, { PropTypes, Component } from 'react';
import { FlatButton, RaisedButton, Dialog } from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

// const propTypes = {

// };

// const customContentStyle = {
//   width: '100%',
//   maxWidth: 'none',
// };

export default class JobEntry extends Component {
  // static propTypes = {

  // }

  // constructor(props) {
  //   super(props);
  // }  

  render() {
    return (
      <div>
        <TextField
          hintText="Hint Text"
          errorText="This field is required"
        /><br />
        <TextField
          hintText="Hint Text"
          errorText="The error text can be as long as you want, it will wrap."
        /><br />
        <TextField
          hintText="Hint Text"
          errorText="This field is required"
          floatingLabelText="Floating Label Text"
        /><br />
        <TextField
          hintText="Message Field"
          errorText="This field is required."
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          rows={2}
        /><br />
      </div>
    )
  }  
}

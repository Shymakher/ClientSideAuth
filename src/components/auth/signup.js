import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit({email, password, passwordConfirm}) {
    console.log("Accept form", email, password, passwordConfirm);
  }

  render() {
    const {handleSubmit, fields: {email, password, passwordConfirm}, error} = this.props;

    console.log("signUp", this.props);

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <Field name="email" component="input" type="text" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <Field name="password" component="input" type="password" className="form-control"/>
          {error}
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password: </label>
          <Field name="passwordConfirm" component="input" type="password" className="form-control"/>
        </div>
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}

export function validate(formProps) {
  const errors = {};

  if(formProps.password !== formProps.passwordConfirm){
    errors.password = 'Password must match';
  }

  return errors;
}

// export default Signup;
export default reduxForm({
  // a unique name for the form
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(
  connect(null, actions)(Signup)
);

// Signup = reduxForm({
//   form: 'signup', // a unique identifier for this form
//   validate
// })(Signup)
//
// Signup = connect(null, actions)(Signup);
//
// export default Signup;
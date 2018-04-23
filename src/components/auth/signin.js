import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'

class Signin extends Component {

  handleFormSubmit({email, password}) {
    console.log(email, password);
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <Field name="email" component="input" type="text" className="form-control"/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <Field name="password" component="input" type="password" className="form-control"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'signin'
})(Signin)
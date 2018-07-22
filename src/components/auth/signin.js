import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form'
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

  handleFormSubmit = ({email, password}) => {
    console.log(email, password);
    this.props.signinUser({email, password});
  }

  renderAlert() {
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
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
        {this.renderAlert()}
        {/*<button type="submit">Submit</button>*/}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.error
  }
}

export default reduxForm({
  // a unique name for the form
  form: 'signin'
})(
  connect(mapStateToProps, actions)(Signin)
);
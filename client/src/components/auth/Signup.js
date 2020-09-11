import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signup } from '../../action/auth';

const Signup = ({ signup, isAuthenticated }) => {
  const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
  }); 

  const { name, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    signup({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/user" />;
  }

  const showSignUpForm = () => (
    <Fragment>
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit}>
        <div>
          Enter Name:<br />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            autoComplete="true"
            onChange={onChange}
          />
        </div>
        <div>
          Enter Email Address:<br />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            autoComplete="true"
            onChange={onChange}
          />
        </div>
        <div>
          Enter Password:<br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            autoComplete="true"
            onChange={onChange}
          />
        </div>
        <input type="submit" value="Sign Up" />
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </Fragment>
  )

  return showSignUpForm()
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signup })(Signup);

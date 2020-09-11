import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signin } from '../../action/auth';

const Signin = ({ signin, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    signin(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/user" />;
  }

  const showSignInForm = () => (
    <Fragment>
      <h1>Sign In</h1>
      <form onSubmit={onSubmit}>
        <div>
          Enter Email Address:<br />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            autoComplete="true"
            required
          />
        </div>
        <div>
          Enter Password:<br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            autoComplete="true"
            minLength="6"
          />
        </div>
        <input type="submit" value="Sign In" />
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </Fragment>
  )

  return showSignInForm()
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signin })(Signin);

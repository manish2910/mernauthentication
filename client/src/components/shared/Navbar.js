import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../../action/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, signout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/user'>{' '}
          <span>User</span>
        </Link>
      </li>
      <li>
        <a onClick={signout} href='#!'>{' '}
          <span>Sign out</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/signup'>Sign Up</Link>
      </li>
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
    </ul>
  );

  return (
    <nav>
      <h1>
        <Link to='/user'>
          User
        </Link>
      </h1>
      {(
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { signout }
)(Navbar);

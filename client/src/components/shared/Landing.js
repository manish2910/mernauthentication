import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/user' />;
  }

  const showHomePage = () => (
        <section className="main_container ">
          <div>
            <div>
              <h1>Sign Up yourself to continue</h1>
              <div className="landing_page">
                <Link to='/signup'>
                  Sign Up
                </Link>
                <Link to='/signin'>
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
  )

    return (
      <Fragment>
        {showHomePage()}
      </Fragment>
    )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);

import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo" href="">
            Emaily
          </a>
          <ul className="right">
            <li>
              <a href="">Login with Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;

import React from 'react';
import PropTypes from 'prop-types';

import StripeCheckout from 'react-stripe-checkout';

class Payments extends React.Component {
  render() {
    // debugger;
    return (
      <StripeCheckout
        name="Emaily"
        description="5$ for 5 Credits"
        amount={500}
        token={token => console.log(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}>
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default Payments;

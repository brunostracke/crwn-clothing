import React from "react";
import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IyhAlGFN020WASsxJUsvliwQEoVU1BHFKEp289y6xFGp9AbY1jQw1hBMsQyU3scQlwETSsLIspIL5aleQBbUva200K6MlT27u";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successful");
      })
      .catch((error) => {
        console.log("payment error: " + JSON.parse(error));
        alert(
          "There was an issue with your payment. Please sure you use the provided credit cart."
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Cloathing ltd."
      billingAddress
      shippingAddress
      // image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;

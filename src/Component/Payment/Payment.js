import { React, useState } from "react";
import "./Payment.css";
import { FaUnlockAlt } from "react-icons/fa";
import PaystackPop from "@paystack/inline-js";

function Payment() {
  const [emailAddress, setEmailAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [firtname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  const Paywithpaystack = (e) => {
    e.preventDefault();

    const Paystack = new PaystackPop();
    Paystack.newTransaction({
      key: "pk_test_93f1d8a28369c7c5124f24e0ef12a252bf89ae98",
      amount: amount * 100,
      email: emailAddress,
      firtname,
      lastname,

      onSuccess(transaction) {
        let message = `Payment Complete! Reference ${transaction.reference}`;
        alert(message);

        setEmailAddress("");
        setAmount("");
        setFirstName("");
        setLastName("");
      },
      oncancel() {
        alert("You have cancelled the transaction");
      },
    });
  };

  return (
    <div>
      <div className="payment">
        <h2>Make your payment</h2>
        <div className="payment_form">
          <input
            type="email"
            name="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
            placeholder="EmailAddress"
          />

          <input
            type="number"
            name="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Amount"
          />

          <input
            type="text"
            name="name"
            value={firtname}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="Firstname"
          />

          <input
            type="text"
            name="name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Lastname"
          />

          <button className="pay" type="submit" onClick={Paywithpaystack}>
            Make Payment
          </button>
        </div>
        <div className="pay_dir">
          <FaUnlockAlt /> <p>Secured by PAYSTACK </p>
        </div>
        <p className="paystack">What is paystack?</p>
      </div>
    </div>
  );
}

export default Payment;

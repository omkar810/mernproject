import React, {useEffect, useState} from 'react';
import './Dashboard.css';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Dashboard = () =>{
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const callDashboard = async () =>{
    try{
         const res = await fetch('/Dashboard', {
           method:"GET",
           headers:{
             Accept: "application/json",
             "Content-Type": "application/json"
           },
           credentials: "include"
         });
         const data = await res.json();
         console.log(data);
         setUserData(data);

         if (!res.status === 200) {
           const error = new Error(res.error);
           throw error;
         }
    } catch(err){
         console.log(err);
         history.push('/login');
    }
  }
  useEffect(() => {
    callDashboard();
  },[]);
  
  function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}
async function displayRazorpay() {
  const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
  }

  // creating a new order
  const result = await axios.post("http://localhost:3000/payment/orders");

  if (!result) {
      alert("Server error. Are you online?");
      return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = result.data;

  const options = {
      key: "rzp_test_yoxZYn5yJVgrTu",
      amount: amount.toString(),
      currency: currency,
      name: "E-learning",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
          const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
          };

          const result = await axios.post("http://mernelearn.herokuapp.com/payment/success", data);

          alert(result.data.msg);
      },
      prefill: {
          name: userData.fname && userData.lname,
          email: userData.email,
          contact: userData.phone,
      },
      notes: {
          address: "E-learning Corporate Office",
      },
      theme: {
          color: "#61dafb",
      },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
  return(
    <>
    <div className='welcome-dash'>
      <h1><b>Welcome</b> {userData.fname} {userData.lname}..</h1>
    </div>
    <div className='container'>
      <div className='course'>
        <img src={require('./course/htmls.png').default} alt="loading..." />
        <h4>HTML5</h4>
        <p>Rs.999</p>
        <b>Rs.499</b>
        <div className='ec'>
        <button onClick={displayRazorpay}>
            Enroll now
        </button>
        </div>
      </div>
      <div className='course'>
        <img src={require('./course/pythons.png').default} alt="loading..." />
        <h4>Python</h4>
        <p>Rs.1499</p>
        <b>Rs.499</b>
        <div className='ec'>
        <button onClick={displayRazorpay}>
            Enroll now
        </button>
        </div>
        </div>
      <div className='course'>
        <img src={require('./course/javas.jpg').default} alt="loading..." />
        <h4>Java</h4>
        <p>Rs.1499</p>
        <b>Rs.499</b>
        <div className='ec'>
        <button onClick={displayRazorpay}>
            Enroll now
        </button>
        </div>
      </div>
    </div>
    </>
  );
}
export default Dashboard;
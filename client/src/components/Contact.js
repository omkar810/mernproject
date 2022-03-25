import React from 'react';
import  {useEffect, useState} from 'react';
import{ FaFacebookSquare,
       FaInstagramSquare,
       FaYoutubeSquare } 
from 'react-icons/fa';
import './Contact.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
const Contact = () => {
    const [userData, setUserData] = useState({fname:"", lname:"", email:"", message:""});
  const callData = async () =>{
    try{
         const res = await fetch('/getdata', {
           method:"GET",
           headers:{
             "Content-Type": "application/json"
           },
         });
         const data = await res.json();
         console.log(data);
         setUserData({ ...userData, fname:data.fname, lname:data.lname, email:data.email});

         if (!res.status === 200) {
           const error = new Error(res.error);
           throw error;
         }
    } catch(err){
         console.log(err);
    }
  }
  useEffect(() => {
    callData();
  },[])
  const handleSubmit = (e) =>{
       const name = e.target.name;
       const value = e.target.value;

       setUserData({ ...userData, [name]:value});
  }
  const ctsubmit = async (e) => {
      e.preventDefault();
    const {fname, lname, email, message} = userData;
    const res = await fetch('/Contact',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            fname, lname, email, message
        })
    });
    const data = await res.json();
    if (!data) {
        // window.alert("Message not send");
        Swal.fire( 'Please fill up the Details','Click ok','cross');
    } else if (!message || !fname || !lname || !email) {
        // window.alert("Message not send");
        Swal.fire( 'Please fill up the Details','Click ok','cross');
        // window.location.reload(false);
    } else {
        // window.alert("Message sent");
        // window.location.reload(true);
        setTimeout(() => {
          window.location.reload(true)
        }, 2000)
        Swal.fire( 'Message sent','','success');
        setUserData({ ...userData, message:""});
    }
  }
  const history = useHistory();
  const callContact = async () =>{
    try{
         const res = await fetch('/Contact', {
           method:"GET",
           headers:{
             Accept: "application/json",
             "Content-Type": "application/json"
           },
           credentials: "include"
         });
         const data = await res.json();
         console.log(data);


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
    callContact();
  },[]);
  
    return (
        <>
        <div className="social-media">
            <h1>Follow Us on</h1><hr/>
            <ul className="social">
                <li><a href="https://www.facebook.com/omkar.khedekar.3705" target="_blank"><FaFacebookSquare className="facebook"/></a></li>
                <li><a href="https://www.instagram.com/omiii_k09/" target="_blank"><FaInstagramSquare className="instagram"/></a></li>
                <li><a href="https://youtube.com/channel/UCGW2amJ_OB2IG1o_ZHZfXKQ" target="_blank"><FaYoutubeSquare className="youtube"/></a></li>
            </ul>
        </div>
        <div className="contact">
            <h1>Get in touch</h1>
           <form method="POST">
              <input type="text" name='fname' value={userData.fname} onChange={handleSubmit} placeholder="Enter your first name"/><br />
              <input type="text" name='lname' value={userData.lname} onChange={handleSubmit} placeholder="Enter your last name"/><br />
              <input type="email" name='email' value={userData.email} onChange={handleSubmit} placeholder="Email address"/><br />
              <textarea name="message" id="message" cols="30" rows="10" onChange={handleSubmit} placeholder="Message"></textarea><br />
              <button type="submit" onClick={ctsubmit}>Send Message</button>
           </form>
        </div> 
        </>
    );
    }
export default Contact;

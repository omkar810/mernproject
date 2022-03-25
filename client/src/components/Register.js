import React, { useState } from 'react';
import './Register.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import {useContext} from 'react';
import Swal from 'sweetalert2';

const Register = () => {
    const {state, dispatch} = useContext(UserContext);
    dispatch({type:"USER", payload: false});
    const history = useHistory();

    const [user, setUser] = useState({
        fname: "", lname: "", email: "", phone: "", password: "", cpassword: ""
    });
    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }
    const PostData = async (e) => {
        e.preventDefault();

        const { fname, lname, email, phone, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fname, lname, email, phone, password, cpassword
            })
        });
        const data = await res.json();
        if (res.status === 422 || !data) {
            // window.alert("Invalid registration");
            Swal.fire( 'Please fill up the Details','','error');
        } else {
            // window.alert("Registration successful");
            Swal.fire( 'Registration successful','','success');
            history.push('/login');
        }

        if(password !== cpassword){
            Swal.fire( "Password isn't match",'','error');
        }else if(password.length < 6 || password.length > 15){
            Swal.fire( "Password should be 6 to 15 digits",'','error');
        }else if(phone.length < 10 || phone.length > 10){
            Swal.fire( "Phone number should be 10 digits",'','error');
        }else if(fname.length < 3){
            Swal.fire( "First name should be  complete",'','error');
        }else if(lname.length < 3){
            Swal.fire( "Last name should be  complete",'','error');
        }else if(email.length < 5){
            Swal.fire( "Email id should be complete",'','error');
        }else if(fname === lname){
            Swal.fire( "First name and Last name should be diffrent",'','error');
        }else if(fname.length > 20){
            Swal.fire( "First name too large",'','error');
        }else if(lname.length > 20){
            Swal.fire( "Last name too large",'','error');
        }else if(email.length > 25){
            Swal.fire( "Email id too large",'','error');
        }
    }
    const Reset = () =>{
        window.location.reload(false);
    }
    return (
        <>
            <div className="register-m">
                <form className="register" method="POST">
                    <h1>Sign Up</h1>
                    <label htmlFor="First Name">First Name:</label>
                    <input type="text" name="fname" placeholder="Enter your First name" value={user.fname} onChange={handleInputs} /><br />
                    <label htmlFor="Last Name">Last Name:</label>
                    <input type="text" name="lname" placeholder="Enter your Last name" value={user.lname} onChange={handleInputs} /><br />
                    <label htmlFor="Email">Email:</label>
                    <input type="email" name="email" placeholder="Enter your Email" value={user.email} onChange={handleInputs} /><br />
                    <label htmlFor="Phone" id="lightc">Phone(+91):</label>
                    <input type="number" name="phone" placeholder="Enter your Phone number" value={user.phone} onChange={handleInputs} /><br />
                    <label htmlFor="Password">Password:</label>
                    <input type="password" name="password" placeholder="Create a password" value={user.password} onChange={handleInputs} /><br />
                    <label htmlFor="Confirm Password">Confirm Password:</label>
                    <input type="password" name="cpassword" placeholder="Confirm a password" value={user.cpassword} onChange={handleInputs} /><br />
                    <div className="bttn">
                        <button type="submit" onClick={PostData}>Sign Up</button>
                        <button type="reset" onClick={Reset}>Reset</button>
                    </div>
                    Do you have an account?<Link to="/login">&nbsp;Log in here</Link>
                </form>

            </div>
        </>
    )
}
export default Register;

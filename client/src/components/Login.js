import React, {useContext, useState} from 'react';
import './Sign.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import Swal from 'sweetalert2';

const Login = ()=> {
  const {state, dispatch} = useContext(UserContext);
  dispatch({type:"USER", payload: false});
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const loginUser = async (e) =>{
    e.preventDefault(e);
    const res = await fetch('/login',{
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        email, 
        password
      })
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
        // window.alert("Invalid username or password");
        Swal.fire( 'Invalid username or password','','error');
    }else {
        dispatch({type:"USER", payload: true})
        // window.alert("Login successful");
        history.push("/Dashboard");
        // window.location.reload(false);
        setTimeout(() => {
          window.location.reload(true)
        }, 2000)
        Swal.fire( 'Login successful','','success');
    }
  }
  return (
    <div className="login">
      <form className="sign-in" method="POST">
        <h1>Log In</h1>
        <div className="center">
          <div className="first">
            <label htmlFor="Username">Username:</label>
            <input type="text" className="border" name="email" placeholder="Enter username or email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="next">
            <label htmlFor="Password">Password:</label>&nbsp;
            <input type="password" name="password" className="border" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" onClick={loginUser}>Log in</button>
          {/* <p>or <Link to="/forgot">Forgot Password</Link></p> */}
          <p>Don't Have an Account? <Link to="/register">Create a new account</Link></p>
        </div>
      </form>
    </div>

  )
}
export default Login;

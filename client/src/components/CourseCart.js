import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './CourseCart.css';

const CourseCart = () => {
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const callCourseCart = async () => {
    try {
      const res = await fetch('/CourseCart', {
        method: "GET",
        headers: {
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
    } catch (err) {
      console.log(err);
      history.push('/login');
    }
  }
  useEffect(() => {
    callCourseCart();
  }, []);
  return (
    <div className='Course-cart'>
      <h1>Enrolled cources</h1>
      <hr />
      <p className='warning'>Note: The course structure is under process. </p>
      <div className='container-mc'>
        <div className='course-mc'>
          <img src={require('./course/htmls.png').default} alt="loading..." />
          <h4>HTML5</h4>
          <div className='ec-mc'>
            <button>
              Open
            </button>
          </div>
        </div>
        <div className='course-mc'>
          <img src={require('./course/pythons.png').default} alt="loading..." />
          <h4>Python</h4>
          <div className='ec-mc'>
            <button>
              Open
            </button>
          </div>
        </div>
        <div className='course-mc'>
          <img src={require('./course/javas.jpg').default} alt="loading..." />
          <h4>Java</h4>
          <div className='ec-mc'>
            <button>
              Open
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseCart;

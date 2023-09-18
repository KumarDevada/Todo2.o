import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import Spinner from './Spinner';
// const API_BASE = 'http://localhost:3000';
const API_BASE = 'https://server-todo2-o.onrender.com'
const Signup = () => {

  const navigate = useNavigate();

  const [war,setwar] = useState(0);
  const [passtype,chpass] = useState('password')
  const [col,chCol] = useState('black')

  const [name,setname] = useState('')
  const [email,setemail] = useState('')
  const [pass,setpass] = useState('')

  const [load,setload] = useState(false);


  const show = () => {
    chpass((prev) => {
      return prev === 'password' ? 'name' : 'password';
    });
    chCol((prev) => {
      return prev === 'black' ? 'red' : 'black';
    })
  }

  const check = async() => {

    const api = API_BASE+'/users/'+email
      await axios.get(api)
          .then(response => {
            const user = response.data;
            if(user.length>0) {
              setwar(1);
              alert('Email already registered. Please use a different email.')
              return;
            }
            else setwar(0);
          })
          .catch(error => {
            console.log('error: ',error);
          })

  }


  const register = async (e) => {
    if(name==='' || email==='' || pass==='') {
      alert("Please enter the data.")
      return;
    }
    if(war===1) {
      alert('Email already registered. Please use a different email.')
      return ;
    }
    e.preventDefault();

    try {
      
      const response = await axios.post(API_BASE+'/users/new', {
        username: name,
        email: email,
        password: pass,
      });

      // Handle the response from the server as needed
      console.log('Server response:', response.data);
      setload(true)
      setTimeout(() => {
        setload(false);
        navigate('/home',{state:{ person: response.data }},)
      },1000)
      
    } catch (error) {
      // Handle errors here
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <center><h1>Enter your Details</h1></center>
      
      <br />
      <br />
        <center>
            <div className='ibox'><input id='name' type='text' onChange={e => setname(e.target.value)} value={name} placeholder='Username'></input></div><br />
            <div className='ibox'><input id='email' type='email' onChange={e => setemail(e.target.value)} value={email} placeholder='Email'></input>{war===1 && <i id='warning' data-bs-toggle="tooltip" data-bs-placement="top" title="Invalid email !" className="fa-solid fa-circle-exclamation"></i>}</div><br />
            <div className='ibox'><input id='pass' type={passtype} onClick={check} onChange={e => setpass(e.target.value)} value={pass} placeholder='Password'></input><i id='eye' onClick={show} className="fa-solid fa-eye" style={{color:col}}></i></div><br />
            <button id='lbtn' onClick={register}>Sign Up</button><br />
            <Link to="/"><button id='rbtn' >Already a member</button></Link>
            {load && <Spinner text='Signing up' />}
        </center>
    </div>
  )
}

export default Signup
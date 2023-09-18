import axios from 'axios'
import React, { useState, useTransition } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Spinner from './Spinner';
// const API_BASE = 'http://localhost:3000';
const API_BASE = 'https://server-todo2-o.onrender.com'
const Login = () => {
  const navigate = useNavigate()

  const [email,setemail] = useState('')
  const [size,setsize] = useState(2);
  const [pass,setpass] = useState('')
  const [passtype,chpass] = useState('password')
  const [col,chCol] = useState('black')

  const [load,setload] = useState(false);

  const show = () => {
    chpass((prev) => {
      return prev === 'password' ? 'name' : 'password';
    });
    chCol((prev) => {
      return prev === 'black' ? 'red' : 'black';
    })
  }

  const login = async () => {
    if(email==='' || pass==='') {
      alert('Enter valid credentials.')
      return ;
    }
    var success=false
    const api = API_BASE+'/users/'+email
    await axios.get(api)
          .then(response => {
            const user = response.data;
            for(var i=0;i<user.length;i++) {
              if(user[i].password===pass) {
                // alert('Login Successful')
                success=true
                setload(true);
                setTimeout(() => {
                  setload(false);
                  navigate('/home',{state:{person:user[i]}})
                },1000)
                // console.log(user[i]);
                
                break;
              }
            }
            // response.data.map(user => {
            //   if(user.password===pass) {
            //     alert('Login Successful')
            //     return;
            //   }
            // })
          })
          .catch(error => {
            console.log('error : ',error);
          })
    if(!success) alert("Login failed. Try again..!")

  }


  const check = async() => {

    const api = API_BASE+'/users/'+email
    await axios.get(api)
          .then(response => {
            const user = response.data;
            setsize((prev) => {
              return (!user || user.length===0) ? 0 : 1 ;
            })
          })
          .catch(error => {
            console.log('error : ',error);
          })

  }

  

  
  return (
    
    <div>
      <br />
      <br />
      <br />
      <br />
      <center><h1>Who are you ?</h1></center>
      
      <br />
      <br />
        <center>
            <div className='ibox'><input id='email' type='email' onChange={(e)=>setemail(e.target.value)} value={email} placeholder='Email'></input>{size===1 && <i id='tick' data-bs-toggle="tooltip" data-bs-placement="top" title="verified !" className="fa-solid fa-circle-check"></i>} {size===0 && <i id='warning' data-bs-toggle="tooltip" data-bs-placement="top" title="user not found !" className="fa-solid fa-circle-exclamation"></i>}</div><br />
            <div className='ibox'><input id='pass' type={passtype} onClick={check} onChange={(e) => setpass(e.target.value)} value={pass} placeholder='Password'></input><i id='eye' data-bs-toggle="tooltip" data-bs-placement="top" title="show" onClick={show} className="fa-solid fa-eye" style={{color:col}}></i></div><br />
            <button id='lbtn' onClick={login}>Sign in</button><br />
            <Link to="/signup"><button id='rbtn' >I'm not a member</button></Link><br />
            {load && <Spinner text='Signing in' />}
        </center>
    </div>
  )
}

export default Login
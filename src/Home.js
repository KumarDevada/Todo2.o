import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Spinner from './Spinner';
// const API_BASE = 'https://mern-crud-app-a386.onrender.com';
// const API_BASE = 'http://localhost:3000';
const API_BASE = 'https://server-todo2-o.onrender.com'
const Home = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state.person;
    

    const [todos,setTodos] = useState([]);
    const [popupActive, setpopupActive] = useState(false)
    const [newTodo, setNewTodo] = useState("")
    const [load,setload] = useState(false);
    console.log(user);
    console.log(todos);

    useEffect(() => {
        GetTodos();
        console.log(user);
        console.log(todos);
    },[])

    const GetTodos = () => {
      const api = API_BASE+'/users/'+user._id+'/todos';
        fetch(api)
        .then(res => res.json())
        .then(data => setTodos(data))
        .catch(err => console.error('Error : ',err))
    }

    const completeTodo = async id => {
      const api = API_BASE+'/users/'+user._id+'/todos/complete/'+id;
        await fetch(api)
          .then(res => res.json())
          .then(data => setTodos(data))
          .catch(error => {
            console.log('error : ',error);
          })
    }

    const deleteTodo = async id => {
      setTodos(todos => todos.filter(todo => todo._id !== id));
      const api = API_BASE+'/users/'+user._id+'/todos/delete/'+id
      
        const data = await fetch(api, {method: 'DELETE'})
            .then(res => res.json())
            .catch(error => {
              console.log('error : ',error);
            })

        
    }

    const addTodo = async () => {
        if(newTodo==="") {
        alert("Type something bro...");
        return;
        }
        const api = API_BASE+'/users/'+user._id+'/todos/new';
        const data = await fetch(api,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: newTodo
        })
        }).then(res => res.json());

        setTodos([...todos,data]);
        setpopupActive(false);
        setNewTodo('');
        console.log(data);
    }

    const logout = () => {
      // user = null;
      setTodos([]);
      window.history.replaceState(null, '', '/');
      setload(true)
      setTimeout(() => {
        setload(false)
        navigate('/');
      },1000);
    }

  return (
    <div className='App'>
      <div className='header'><h1>Hii {user.username}</h1><button onClick={logout} className='logout'><i class="fa-solid fa-right-from-bracket"></i></button></div>
        
      <h4>Your Tasks Here...</h4>

      <div className='todos'>
        {todos.map(todo => (
          <div className='box'>
            {/* <div className='todo'> */}
            <div className={'todo '+(todo.complete ? 'is-complete' : '')} key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className='checkbox'></div>
              <div className='text'>{todo.text}</div>
            </div>
            <div className='delete-todo' onClick={() => deleteTodo(todo._id)}><i class="fa-solid fa-x"></i></div>
          </div>
            
        ))}
      </div>

      {load && <Spinner text='Signing out'/>}
      <div className='addPopup' onClick={() => setpopupActive(true)}><i class="fa-solid fa-plus"></i></div>

      {popupActive ? (
        <div className='popup'>
          <div className='closePopup'  onClick={() => setpopupActive(false)}><i class="fa-solid fa-x"></i></div>
          <div className='content'>
            <h3>Add a Task</h3>
            <input type='text' className='add-todo-input' onChange={e => setNewTodo(e.target.value)} value={newTodo} />
          </div>
          <center><div className='button' onClick={addTodo}>Create Task</div></center>
          
        </div>
        
      ) : ''}
    </div>
  )
}

export default Home
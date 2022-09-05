import React , {useState, useEffect,useContext}  from 'react';
import {useNavigate,Link} from "react-router-dom";
import Home from '../Home';

import { SidebarData } from '../SidebarData/hospital';
import"../Home/style.css";
const Hospital_Home=()=>{
  
    const [auth,setAuth]=useState('');
    let history=useNavigate();
  useEffect(()=>{
    var auth =localStorage.getItem('email');
    setAuth(auth);
  
  },[])
function SideBar(){
  return <div><div className='Sidebar'>
    
    <div className='SidebarList'>
    <li className='row'>Hospital</li>
     <li className='row'>Welcome Back!! {localStorage.getItem('name')}</li></div>
    <ul className='SidebarList'>{SidebarData.map((val, key)=> {
    return(
      <div>
      <div>
      <li className='row' id={window.location.pathname == val.link ? "active": ""} key={key} >
       <Link  id='title' to ={val.link} > {val.title}</Link> 
      </li>
      
      </div>
      
      </div>
    )
  })}
  </ul>
  
  </div>
  <div className='home_content'>
  <Home/>
</div>
</div>
}
    if(auth===null){
        history('/login_type');
      }
    return(
        <div className='App'>
          <SideBar/>
        </div>
    )
}

export default Hospital_Home;
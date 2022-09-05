import React , {useState, useEffect,useContext}  from 'react';
import {useNavigate,Link} from "react-router-dom";
import { SidebarData } from '../SidebarData/doctor';
import Home from '../Home';
import "./style.css";
const Doctor_home=()=>{
 
  const [auth,setAuth]=useState('');
  let history=useNavigate();
useEffect(()=>{
  var auth =localStorage.getItem('email');
  setAuth(auth);

},[])
function SideBar(){
return <div><div className='Sidebar'>
  <div className='SidebarList'>
   <li className='row'>Welcome Back!! {localStorage.getItem('name')}</li></div>
  <ul className='SidebarList'>{SidebarData.map((val, key)=> {
  return(
    <div>
    <li className='row' id={window.location.pathname == val.link ? "active": ""} key={key} >
     <Link  id='title' to ={val.link} > {val.title}</Link> 
    </li>
    </div>
  )
})}
</ul></div>
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
export default Doctor_home;
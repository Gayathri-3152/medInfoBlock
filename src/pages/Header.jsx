import React , {useContext,useEffect,useState}  from 'react';
import {Link, useNavigate } from 'react-router-dom';

const Header=()=>{
  
  
  const [user,setUser]=useState('');

 
  const RenderMenu=()=>{
    const LogOut =() =>{
      localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.clear();
    
     }

    useEffect(async ()=>{
    
        setUser(await localStorage.getItem("name"));
        console.log(user)
  
    },[])
   
    
    if(user !== null || user!=="")
     {
       return(
      
        <>
         <li class="nav-item">
       <Link to ="/" class="nav-link">Home</Link> 
       </li>
        <li class="nav-item">
       <Link to ="/register_type" class="nav-link">Register</Link> 
       </li>
  
        <li class="nav-item">
        <Link to ="/login_type" class="nav-link">Login</Link> 
        </li>
        <li class="nav-item">
   
   <Link to ="/login_type" onClick={LogOut} class="nav-link">Logout</Link> 
   </li>
        </>
     
     
    
       )
  }
  else{
    return(
      <li class="nav-item">
   
   <Link to ="/login_type" onClick={LogOut} class="nav-link">Logout</Link> 
   </li>
      
    )
  }
}
     return(
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
            <Link to ="/" class="nav-link">MedinfoBlock</Link>
            </li>
            </ul>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
      
           <RenderMenu/>
          </ul>
        </div>
      </nav>
          )
     }


export default Header;


/*import React , { Component}  from 'react';
import {BrowserRouter,Routes,Route,Link } from 'react-router-dom';

const Header=()=>{
    return(
<nav class="navbar navbar-expand-lg navbar-dark bg-dark val">
<ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link to ="/" class="nav-link"><b>MedinfoBlock</b></Link>
      </li>
      </ul>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link to ="/" class="nav-link">Home</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/register_type" class="nav-link">Register</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/login_type" class="nav-link">Login</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/viewMyRecords" class="nav-link">viewMyRecords</Link> 
      </li>
      
      <li class="nav-item">
      <Link to ="/RevokePermission" class="nav-link">Revoke</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/GivePermission" class="nav-link">Give</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/GivePermissionForOthers" class="nav-link">GiveOthers</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/CheckStatusInfo" class="nav-link">status</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/EmergencyUser" class="nav-link">emergency</Link> 
      </li>
      <li class="nav-item">
      <Link to ="/createRecord" class="nav-link">createRecord</Link> 
      </li>
      
    </ul>
  </div>
</nav>
    )
}

export default Header;*/
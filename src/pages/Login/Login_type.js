import React , { useState}  from 'react';
import Patient_Login from './Patient_Login';
import Hospital_Login from './Hospital_login';
import Doctor_Login from './Doctor_login';
import Insurance_Login from './Insurance_login';
const Login_Type=()=>{
    const [reg_type, setReg_type] =useState("");
    function tab(value){
      if(reg_type==="Patient"){
        window.localStorage.setItem('type', 'Patient');
        return <Patient_Login/>} 
      else if(reg_type==="Hospital"){
        window.localStorage.setItem('type', 'Hospital');
        return  <Hospital_Login/>}
        else if(reg_type==="Doctor"){
          window.localStorage.setItem('type', 'Doctor');
            return  <Doctor_Login/>}
        else if(reg_type==="Insurance Provider"){
          window.localStorage.setItem('type', 'Insurance Provider');
          return  <Insurance_Login/>
      }
    }
    return(
        <div  className='main-box'>
        <div className="row">
            <div className="col-md-12 text-center">                    
                   <h1>User Login</h1>
         </div>               
        </div>
        <div className="row">
            <div className="col-md-6"> Choose type of login</div>
            <div className="col-md-6">
        <select className='form-control'  onChange={(e)=>{const regis_type=e.target.value;
        setReg_type(regis_type)
        tab(reg_type)}}>
          <option value="null">select type 
        </option>
          <option value="Patient">Patient</option>
          <option value="Hospital">Hospital</option>
          <option value="Doctor">Doctor</option>
          <option value="Insurance Provider">Insurance Provider</option>
        </select>
            </div>               
        </div>
        { 
tab(reg_type)
        } 
          </div>  
      
        
       
    )
}

export default Login_Type;
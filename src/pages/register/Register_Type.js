import React , { useState}  from 'react';
import Hos_Register from './Hospital_register';
import Insurance_Register from './Insurance_reg';
import Patient_Register from './Patient_Register';
const Register_Type=()=>{
    const [reg_type, setReg_type] =useState("");
    function tab(value){
      if(reg_type==="Patient"){
        return <Patient_Register/>} 
      else if(reg_type==="Hospital"){
        return  <Hos_Register/>}
        else if(reg_type==="Insurance Provider"){
          return  <Insurance_Register/>
      }
    }
    return(
        <div  className='main-box'>
        <div className="row">
            <div className="col-md-12 text-center">                    
                   <h1>User Registeration</h1>
         </div>               
        </div>
        
        <div className="row">
                <div className="col-md-6">Choose Register type</div>
                <div className="col-md-6">
                <select className='form-control' onChange={(e)=>{const regis_type=e.target.value;
        setReg_type(regis_type)
        tab(reg_type)}}>
           <option value="null">select type 
        </option>
          <option value="Patient">Patient
        </option>
          <option value="Hospital">Hospital</option>
          <option value="Insurance Provider">Insurance Provider</option>
        </select> 
        </div>{ 
tab(reg_type)
        }</div>   
          </div>  
      
        
       
    )
}

export default Register_Type;
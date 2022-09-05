import React , { useState}  from 'react';
import Login from './Login';
import Register from './Register';
import HospitalRegister from './HospitalRegister';
const Register_Type=()=>{
    const [reg_type, setReg_type] =useState("");
    return(
        <div  className='main-box'>
        <div className="row">
            <div className="col-md-12 text-center">                    
                   <h1>User Registeration</h1>
         </div>               
        </div>
        
        <div className="row">
                <div className="col-md-6">Choose login type</div>
                <div className="col-md-6">
                <select className='form-control' onChange={(e)=>{const regis_type=e.target.value;
        setReg_type(regis_type)}}>
          <option value="Patient">Patient
        </option>
          <option value="Hospital">Hospital</option>
          <option value="Insurance Provider">Insurance Provider</option>
        </select> 
        </div>{ (reg_type==="Patient")?<Register/>:(reg_type==="Hospital")?<HospitalRegister/>:null

        }</div>   
          </div>  
      
        
       
    )
}

export default Register_Type;
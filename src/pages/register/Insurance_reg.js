import React , {useState,useEffect}  from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validation from '../Validator/insurance_validator';
const Insurance_Register=(props)=>{
    let history = useNavigate();
    const [startDate, setStartDate] = useState(new Date());  
    const [data, setData]=useState({
        name : "",
        gender: "",
        email: "",
        org_name:"",
        password: "",
        confirm_password: "",
        phn_number: "",
        publickey: ""
    });

const [errors, setErrors] = useState({});
const handleChange=(e)=>{
    setData({...data, [e.target.name] : e.target.value});
    console.log(data);
}
const [isSubmit,setIssubmit] = useState(false);

const submitForm =(e)=> {
    e.preventDefault();
    setErrors(validation(data));
    setIssubmit(true);
}

useEffect(()=>{
    if(Object.keys(errors).length === 0 && isSubmit){
 const sendData ={
        name: data.name,
        gender: data.gender,
        email: data.email,
        org_name: data.org_name,
        password: data.password,
        confirm_password: data.confirm_password,
        phn_number: data.phn_number,
        publickey: data.publickey
    }
    console.log(sendData);
    axios.post('http://localhost/unisys/insurance_register.php',sendData).then((result)=>{
        console.log(result);
        if(result.data.data.status ==='valid')
        {     
            history('/login_type');
        }
        else{
            
            alert(result.data.data.status);
        }
    })
    }
},[errors])
    return(
        <div>
            <form onSubmit={submitForm}>
            <div className="row">
                <div className="col-md-6">Name</div>
                <div className="col-md-6">
                    <input type="text" name="name" className='form-control'
                    onChange={handleChange} value={data.name} />
                       {errors.name && <p className='error'> {errors.name}</p>}   
                </div> 
                        
            </div>

            <div className="row">
                <div className="col-md-6">Organization Name</div>
                <div className="col-md-6">
                    <input type="text" name="org_name" className='form-control'
                    onChange={handleChange} value={data.org_name}/>
                      {errors.org_name && <p className='error'> {errors.org_name}</p>}    
                </div> 
                                
            </div>
            <div className="row">
                <div className="col-md-6">Email</div>
                <div className="col-md-6">
                    <input type="email" name="email" className='form-control'
                    onChange={handleChange} value={data.email}/>
                     {errors.email && <p className='error'> {errors.email}</p>}   
                </div> 
                                  
            </div>
            <div className="row">
                <div className="col-md-6">Gender</div>
                <div className="col-md-6">
                <div  onChange={handleChange} value={data.gender}>
        <input type="radio" value="Male" name="gender" /> Male<br/>
        <input type="radio" value="Female" name="gender" /> Female<br/>
        <input type="radio" value="Other" name="gender" /> Other<br/>
      </div>
      {errors.gender && <p className='error'> {errors.gender}</p>}  
            </div> 
                                
            </div>
            <div className="row">
                <div className="col-md-6">Password</div>
                <div className="col-md-6">
                    <input type="password" name="password" className='form-control'
                    onChange={handleChange} value={data.password}/>
                       {errors.password && <p className='error'> {errors.password}</p>}
                </div>       
            </div>
             
            <div className="row">
                <div className="col-md-6">Confirm Password</div>
                <div className="col-md-6">
                    <input type="password" name="confirm_password" className='form-control'
                    onChange={handleChange} value={data.confirm_password}/>
                     {errors.password && <p className='error'> {errors.password}</p>} 
                </div> 
                                
            </div>
            <div className="row">
                <div className="col-md-6">Phone Number</div>
                <div className="col-md-6">
                    <input type="number" name="phn_number" className='form-control'
                    onChange={handleChange} value={data.phn_number}/>
                     {errors.phn_number && <p className='error'> {errors.phn_number}</p>}   
                </div>     
                      
            </div>
            <div className="row">
                <div className="col-md-6">Publickey</div>
                <div className="col-md-6">
                    <input type="text" name="publickey" className='form-control'
                    onChange={handleChange} value={data.publickey}/>
                </div>               
            </div>
            <div className="row">
                <div className="col-md-6">
                    <input type="submit" name="submit" value="register" className="btn btn-success"/>
                </div>               
            </div>
            </form>
        </div>
    )
}

export default Insurance_Register;
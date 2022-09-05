import React , {useState,useEffect}  from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import validation from '../Validator/FormValidator';
const Patient_Register=(props)=>{
    let history = useNavigate();
    const [startDate, setStartDate] = useState(new Date());  
    const [data, setData]=useState({
        first_name : "",
        last_name : "",
        email: "",
        password: "",
        confirm_password: "",
        phn_number: "",
        gender: "",
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
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phn_number: data.phn_number,
        password: data.password,
        confirm_password: data.confirm_password,
        gender: data.gender,
        dob: startDate,
        publickey: data.publickey
    }
    console.log(sendData);
    axios.post('http://localhost/unisys/register.php',sendData).then((result)=>{
        console.log(result);
        if(result.data.data.status ==='valid')
        {     
            history('/login');
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
                <div className="col-md-6">First Name</div>
                <div className="col-md-6">
                    <input type="text" name="first_name" className='form-control'
                    onChange={handleChange} value={data.first_name} />
                       {errors.first_name && <p className='error'> {errors.first_name}</p>}   
                </div> 
                        
            </div>

            <div className="row">
                <div className="col-md-6">Last Name</div>
                <div className="col-md-6">
                    <input type="text" name="last_name" className='form-control'
                    onChange={handleChange} value={data.last_name}/>
                      {errors.last_name && <p className='error'> {errors.last_name}</p>}    
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
                <div className="col-md-6">Date Of Birth</div>
                <div className="col-md-6">
                    <div onChange={handleChange}  value={data.dob}>
                    <DatePicker selected={startDate}  name="dob" onChange={(date) =>   
setStartDate(date)}  />  
</div>         
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

export default Patient_Register;
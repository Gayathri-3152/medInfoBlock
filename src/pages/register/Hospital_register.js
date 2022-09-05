import React , {useState,useEffect}  from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import validation from '../Validator/HospitalFormValidator';
const Hos_Register=(props)=>{
    let history = useNavigate();
    const [data, setData]=useState({
        hospital_name : "",
        type : "",
        address: "",
        hospital_email: "",
        reg_number:"",
        hosphn_number:"",
        node_name:"",
        node_email:"",
        password:"",
        confirm_password:"",
        node_phn_number:"",
        publickey: ""

    });
const [errors, setErrors] = useState({});
const handleChange=(e)=>{
    setData({...data, [e.target.name] : e.target.value});
}
const [isSubmit,setIssubmit] = useState(false);

const submitForm =(e)=> {
    e.preventDefault();
    setErrors(validation(data));
    setIssubmit(true);
}

useEffect(()=>{
    console.log(errors);
    if(Object.keys(errors).length === 0 && isSubmit){
 const sendData ={
    hospital_name: data.hospital_name,
    type: data.type,
    address: data.address,
    hospital_email: data.hospital_email,
    reg_number: data.reg_number,
    hosphn_number: data.hosphn_number,
    node_name: data.node_name,
    node_email: data.node_email,
    password: data.password,
    confirm_password: data.confirm_password,
    node_phn_number: data.node_phn_number,
    publickey: data.publickey

    }
    
    console.log(sendData);
    axios.post('http://localhost/unisys/hospital_registration.php',sendData).then((result)=>{
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
                <div className="col-md-6">Hospital Name</div>
                <div className="col-md-6">
                    <input type="text" name="hospital_name" className='form-control'
                    onChange={handleChange} value={data.hospital_name} />
                       {errors.name && <p className='error'> {errors.hospital_name}</p>}   
                </div>     
            </div>
            <div className="row">
                <div className="col-md-6">Type</div>
                <div className="col-md-6">
                <div  onChange={handleChange} value={data.type}>
        <input type="radio" value="Government/public" name="type" />Government/public<br/>
        <input type="radio" value="Private" name="type" />Private <br/>
      </div>
      {errors.type && <p className='error'> {errors.type}</p>}  
            </div> 
                                
            </div>

            <div className="row">
                <div className="col-md-6">Address</div>
                <div className="col-md-6">
                    <input type="textarea" name="address" className='form-control'
                    onChange={handleChange} value={data.address}/>
                      {errors.address && <p className='error'> {errors.address}</p>}    
                </div>               
            </div> 
            <div className="row">
                <div className="col-md-6">Hospital Email</div>
                <div className="col-md-6">
                    <input type="email" name="hospital_email" className='form-control'
                    onChange={handleChange} value={data.hospital_email}/>
                     {errors.email && <p className='error'> {errors.hospital_email}</p>}   
                </div>     
            </div>
            <div className="row">
                <div className="col-md-6">Hospital Registration Number</div>
                <div className="col-md-6">
                    <input type="text" name="reg_number" className='form-control'
                    onChange={handleChange} value={data.reg_number}/>
                     {errors.number && <p className='error'> {errors.reg_number}</p>}   
                </div>     
            </div>
            <div className="row">
                <div className="col-md-6">Hospital Phone Number</div>
                <div className="col-md-6">
                    <input type="number" name="hosphn_number" className='form-control'
                    onChange={handleChange} value={data.hosphn_number}/>
                     {errors.phn_number && <p className='error'> {errors.hosphn_number}</p>}   
                </div>     
            </div>
            <div className="row">
                <div className="col-md-6">Nodal Person Name</div>
                <div className="col-md-6">
                    <input type="text" name="node_name" className='form-control'
                    onChange={handleChange} value={data.node_name}/>
                     {errors.name && <p className='error'> {errors.node_name}</p>}   
                </div>     
            </div>
            <div className="row">
                <div className="col-md-6">Nodal Person Email</div>
                <div className="col-md-6">
                    <input type="email" name="node_email" className='form-control'
                    onChange={handleChange} value={data.node_email}/>
                     {errors.email && <p className='error'> {errors.node_email}</p>}   
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
                <div className="col-md-6">Nodal Person Phone Number</div>
                <div className="col-md-6">
                    <input type="text" name="node_phn_number" className='form-control'
                    onChange={handleChange} value={data.node_phn_number}/>
                     {errors.phn_number && <p className='error'> {errors.node_phn_number}</p>}   
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

export default Hos_Register;
import React , {useState,useContext}  from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


const Hospital_Login=(props)=>{
   
    let history = useNavigate();
    const [data, setData]=useState({
        hospital_email: "",
        password: ""
    })
    const handleChange=(e)=>{
        setData({...data, [e.target.name] : e.target.value});
        //console.log(data);
    }
    const submitForm =(e)=> { 
        e.preventDefault();
       const sendData ={
            hospital_email: data.hospital_email,
            password: data.password,
        }
    
    axios.post('http://localhost/unisys/hospital_login.php',sendData).then((result)=>{
        console.log(result.data);
        if(result.data.status.status==='invalid')
        {
            alert('Invalid User');
            
            console.log(result.data.status.status);
        }
        else{
           
            window.localStorage.setItem('name', result.data.hospital_name.hospital_name);
            window.localStorage.setItem('email', result.data.hospital_email.hospital_email);
            history('/hospital_home');
            console.log(result.data.status.status);
        }
    })
}
    return(
        <div className='main-box'>
        <form onSubmit={submitForm}>
        <div className="row">
            <div className="col-md-6">Email</div>
            <div className="col-md-6">
                <input type="email" name="hospital_email" className='form-control'
                onChange={handleChange} value={data.hospital_email}/>
            </div>               
        </div>
        <div className="row">
            <div className="col-md-6">Password</div>
            <div className="col-md-6">
                <input type="password" name="password" className='form-control'
                onChange={handleChange} value={data.password}/>
            </div>               
        </div>
        <div className="row">
                <div className="col-md-6">
                    <input type="submit" name="submit" value="login" className="btn btn-success"/>
                </div>               
            </div>
        </form>
    </div>
    )
}

export default Hospital_Login;
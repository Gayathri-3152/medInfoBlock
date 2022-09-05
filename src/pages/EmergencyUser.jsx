import React, { Component } from "react";
import axios from 'axios';

class EmergencyUser extends Component {
  constructor(props) {
    super(props);    
    this.state = {
     emergencyUser:"",
     email : "",
     isvalid : false

    };
  }
  callPhp_viewerEmailToPublickey = async (sendData)=>{
    await axios.post('http://localhost/unisys/viewerEmailToPublickey.php',sendData).then((result)=>{
      console.log(result.data);
      console.log(result.data.isValidViewer.isValidViewer)
      if(result.data.isValidViewer.isValidViewer==='invalid')
      {
        this.state.isvalid = false
      }
      else{
        this.state.emergencyUser = result.data.publickey.publickey
        this.state.isvalid = true
      }
  })
  }

  callPhp_getEmergencyPublickeyToEmail = async (sendData)=>{
    await axios.post('http://localhost/unisys/getEmergencyPublickeyToEmail.php',sendData).then((result)=>{
      console.log(result.data);
      console.log(result.data.isValidUser.isValidUser)
      if(result.data.isValidUser.isValidUser==='invalid')
      {
        this.state.isvalid = false
      }
      else{
        this.state.email = result.data.email.email
        this.state.isvalid = true
      }
  })
  }

  callsetEmergencyUser = async (user) => {
    const sendData ={
      email: user
    }
    await this.callPhp_viewerEmailToPublickey(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      console.log("in "+this.state.emergencyUser)
      await this.props.setEmergencyUser(this.state.emergencyUser);
    }
    else{
      document.getElementById("user").innerHTML = "invalid email id";
    }
    
  };
  callgetEmergencyUser =   async  () => {
   
    let user = await this.props.getEmergencyUser();
    console.log(user)
    const sendData ={
      email: user
    }
    await this.callPhp_getEmergencyPublickeyToEmail(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      document.getElementById("user").innerHTML = this.state.email;
    }
    else{
      document.getElementById("user").innerHTML = this.state.email+"invalid user id";
    }
  };

  render() {
    return (
    <div className="mt-4">
    
       <div>
        
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callsetEmergencyUser(
                  this.state.emergencyUser
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="emergencyUser">
                  <span className="font-weight-bold">set emergency user</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="emergencyUser"
                  id="emergencyUser"
                  value={this.state.emergencyUser}
                  className="form-control w-50"
                  placeholder="Enter emergency user Address"
                  onChange={(e) =>
                    this.setState({
                        emergencyUser: e.target.value,
                    })
                  }
                />
                
              
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
               set emergency user
              </button>
            </form>
        </div>

       <div>
        
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callgetEmergencyUser();
              }}
            >
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
                get emergency user
              </button>
            </form>
        </div>
        <div id="user"></div>

    </div>
    );
  }
}

export default EmergencyUser;


import React, { Component } from "react";
import axios from 'axios';
import ViewMyRecords from "./ViewMyRecords";
import {Link, useNavigate } from 'react-router-dom';

class ViewRecords extends Component {
  
  constructor(props) {
    
    super(props);    
    this.state = {
      viewRequester: this.props.accountAddress,
      owner:"",
      isvalid :false
    };
  }

  callPhp_patientEmailToPublickey = async (sendData)=>{
    await axios.post('http://localhost/unisys/patientEmailToPublickey.php',sendData).then((result)=>{
      console.log(result.data);
      console.log(result.data.isValidOwner.isValidOwner)
      if(result.data.isValidOwner.isValidOwner==='invalid')
      {
        this.state.isvalid = false
      }
      else{
        this.state.owner = result.data.publickey.publickey
        this.state.isvalid = true
      }
  })
  }

 
  callgiveViewPermissionfromApp = async (requester, owner) => {
    const sendData ={
      email: owner
    }
    await this.callPhp_patientEmailToPublickey(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      console.log("in "+this.state.owner)
      let rec = await this.props.viewRecords(requester,this.state.owner);

      console.log(this.props.othersRecord)
      
      

    }
    else{
      await this.props.clearRecords();
      document.getElementById("viewStatus").innerHTML = "invalid email id";
      console.log(this.props.othersRecord)
    }
  };

  render() {
    return (
    <div className="mt-4">

    <div>
        
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callgiveViewPermissionfromApp(
                  this.state.viewRequester,
                  this.state.owner
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="owner">
                  <span className="font-weight-bold">view records of patient</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="owner"
                  id="owner"
                  value={this.state.owner}
                  className="form-control w-50"
                  placeholder="Enter Requester Address"
                  onChange={(e) =>
                    this.setState({
                        owner: e.target.value,
                    })
                  }
                />
                
              
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
               view records 
              </button>
            </form>
            
            <div id="viewStatus"> </div>
            <div id="record">
            <Link to ="/ViewOthersRecords">view records here</Link> 
            </div>
     
        </div>

    </div>
    );
  }
}
export default ViewRecords;

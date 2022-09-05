import React, { Component } from "react";
import axios from 'axios';


class GivePermissionForOthers extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      viewRequester: "",
      viewOwner:"",
      editRequester: "",
      editOwner:"",
      isvalid :false,
      isvalid1 :false,
      Owner : ""
    };
  }

  callPhp_editorEmailToPublickey = async (sendData)=>{
    await axios.post('http://localhost/unisys/editorEmailToPublickey.php',sendData).then((result)=>{
      console.log(result.data);
      console.log(result.data.isValidEditor.isValidEditor)
      if(result.data.isValidEditor.isValidEditor==='invalid')
      {
        this.state.isvalid = false
      }
      else{
        this.state.editRequester = result.data.publickey.publickey
        this.state.isvalid = true
      }
  })
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
        this.state.viewRequester = result.data.publickey.publickey
        this.state.isvalid = true
      }
  })
  }
  callPhp_patientEmailToPublickey = async (sendData)=>{
    await axios.post('http://localhost/unisys/patientEmailToPublickey.php',sendData).then((result)=>{
      console.log(result.data);
      console.log(result.data.isValidOwner.isValidOwner)
      if(result.data.isValidOwner.isValidOwner==='invalid')
      {
        this.state.isvalid1 = false
      }
      else{
        this.state.Owner = result.data.publickey.publickey
        this.state.isvalid1 = true
      }
  })
  }
  callgiveEditPermissionfromApp = async (requester, owner) => {
    const sendData ={
      email: requester
    }
    await this.callPhp_editorEmailToPublickey(sendData)
    const sendData1 ={
      email: owner
    }
    await this.callPhp_patientEmailToPublickey(sendData1)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid && this.state.isvalid1){
      console.log("in "+this.state.editRequester)
      await this.props.giveEditPermission(this.state.editRequester,this.state.Owner);
    }
    else{
      document.getElementById("editStatus").innerHTML = "invalid email id";
    }
  };
  callgiveViewPermissionfromApp = async (requester, owner) => {
    const sendData ={
      email: requester
    }
    await this.callPhp_viewerEmailToPublickey(sendData)
    const sendData1 ={
      email: owner
    }
    await this.callPhp_patientEmailToPublickey(sendData1)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid && this.state.isvalid1){
      console.log("in "+this.state.viewRequester)
      await this.props.giveViewPermission(this.state.viewRequester,this.state.Owner);
    }
    else{
      document.getElementById("viewStatus").innerHTML = "invalid email id";
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
                  this.state.viewOwner
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="viewrequester">
                  <span className="font-weight-bold">give view permission</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="viewrequester"
                  id="viewrequester"
                  value={this.state.viewRequester}
                  className="form-control w-50"
                  placeholder="Enter Requester Address"
                  onChange={(e) =>
                    this.setState({
                        viewRequester: e.target.value,
                    })
                  }
                />
                
              </div>
                <div className="form-group mt-4 ">
                <label htmlFor="viewowner">
                  <span className="font-weight-bold"></span> 
                </label>{" "}
                <input
                  required
                  type="text"
                  name="viewowner"
                  id="viewowner"
                  value={this.state.viewOwner}
                  className="form-control w-50"
                  placeholder="Enter owner Address"
                  onChange={(e) =>
                    this.setState({
                        viewOwner: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
                give view permission
              </button>
            </form>
            
            <div id="viewStatus"> </div>
        </div>

    <div>
        
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callgiveEditPermissionfromApp(
                  this.state.editRequester,
                  this.state.editOwner
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="editrequester">
                  <span className="font-weight-bold">give edit permission</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="editrequester"
                  id="editrequester"
                  value={this.state.editRequester}
                  className="form-control w-50"
                  placeholder="Enter Requester Address"
                  onChange={(e) =>
                    this.setState({
                      editRequester: e.target.value,
                    })
                  }
                />
                
              </div>
                <div className="form-group mt-4 ">
                <label htmlFor="editOwner">
                  <span className="font-weight-bold"></span> 
                </label>{" "}
                <input
                  required
                  type="text"
                  name="editOwner"
                  id="editOwner"
                  value={this.state.editOwner}
                  className="form-control w-50"
                  placeholder="Enter owner Address"
                  onChange={(e) =>
                    this.setState({
                        editOwner: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
                give edit permission
              </button>
            </form>
            
            <div id="editStatus"> </div>
        </div>

    </div>
    );
  }
}

export default GivePermissionForOthers;

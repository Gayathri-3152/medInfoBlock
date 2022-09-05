import React, { Component } from "react";
import axios from 'axios';

class RevokePermission extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      viewRequester: "",
      editRequester: "",
      isvalid : false
      
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

  callrevokeEditPermission = async (requester) => {
    const sendData ={
      email: requester
    }
    await this.callPhp_editorEmailToPublickey(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      console.log("in "+this.state.editRequester)
      await this.props.revokeEditPermission(this.state.editRequester);
    }
    else{
      document.getElementById("editStatus").innerHTML = "invalid email id";
    }
  };
  callrevokeViewPermission = async (requester) => {
    const sendData ={
      email: requester
    }
    await this.callPhp_viewerEmailToPublickey(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      console.log("in "+this.state.viewRequester)
      await this.props.revokeViewPermission(this.state.viewRequester);
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
                this.callrevokeViewPermission(
                  this.state.viewRequester
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="viewRequester">
                  <span className="font-weight-bold">revoke view permission</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="viewRequester"
                  id="viewRequester"
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
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
                revoke view permission
              </button>
            </form>
            
            <div id="viewStatus"> </div>
        </div>

    <div>
        
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callrevokeEditPermission(
                  this.state.editRequester
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="editRequester">
                  <span className="font-weight-bold">revoke edit permission</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="editRequester"
                  id="editRequester"
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
               
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
                revoke edit permission
              </button>
            </form>
            
            <div id="editStatus"> </div>
        </div>

    </div>
    );
  }
}

export default RevokePermission;

import React, { Component } from "react";
import axios from 'axios';

class ViewingPermissionStatus extends Component {
  constructor(props) {
    super(props);    
    this.state = {
      viewPermission : false,
      editPermission : false,
      viewerAddress : "",
      editerAddress : "",
      isvalid : false,
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
      this.state.editerAddress = result.data.publickey.publickey
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
      this.state.viewerAddress = result.data.publickey.publickey
      this.state.isvalid = true
    }
})
}

  callgetEditPermissionStatusfromApp =  async (editer) => {
    const sendData ={
      email: editer
    }
    await this.callPhp_editorEmailToPublickey(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      console.log("in "+this.state.editerAddress)
      this.state.editPermission = await this.props.getEditPermissionStatus(this.state.editerAddress);
      document.getElementById("editStatus").innerHTML = this.state.editPermission;

    }
    else{
      document.getElementById("editStatus").innerHTML = "invalid email id";
    }
   
  };
  callgetViewPermissionStatusfromApp = async (viewer) => {
    const sendData ={
      email: viewer
    }
     await this.callPhp_viewerEmailToPublickey(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      console.log("in "+this.state.viewerAddress)
      this.state.viewPermission = await this.props.getViewPermissionStatus(this.state.viewerAddress);
    document.getElementById("viewStatus").innerHTML = this.state.viewPermission;

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
                this.callgetViewPermissionStatusfromApp(
                  this.state.viewerAddress
                );
              }}
            >
              
                <div className="form-group mt-4 ">
                <label htmlFor="viewerAddress">
                  <span className="font-weight-bold">Check the view permission status of an address</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="viewerAddress"
                  id="viewerAddress"
                  value={this.state.viewerAddress}
                  className="form-control w-50"
                  placeholder="Enter Address"
                  onChange={(e) =>
                    this.setState({
                        viewerAddress: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
                get view status
              </button>
              <div id="viewStatus"></div>
            </form>   
        </div>

        <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.callgetEditPermissionStatusfromApp(
                  this.state.editerAddress
                );
              }}
            >
              
                <div className="form-group mt-4 ">
                <label htmlFor="editerAddress">
                  <span className="font-weight-bold">Check the edit permission status of an address</span> :
                </label>{" "}
                <input
                  required
                  type="text"
                  name="editerAddress"
                  id="editerAddress"
                  value={this.state.editerAddress}
                  className="form-control w-50"
                  placeholder="Enter Address"
                  onChange={(e) =>
                    this.setState({
                        editerAddress: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.8rem", letterSpacing: "0.14rem" }}
                className="btn-width btn-color mt-4 btn-block"
              >
                get edit status
              </button>
              <div id="editStatus"> </div>
            </form>   
        </div>

      </div>
    );
  }
}

export default ViewingPermissionStatus;

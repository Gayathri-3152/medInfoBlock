/*import React , { Component}  from 'react';

const Home=()=>{
    return(
        <div>
            Home page
        </div>
    )
}

export default Home;*/
import React, { Component } from "react";
import axios from 'axios';


class CreateRecord extends Component {
  constructor(props) {
    super(props);    
    this.state = {
     
      owner:"",
      title: "",
      description:"",
      ownerAddress : ""
      
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
        this.state.ownerAddress = result.data.publickey.publickey
        this.state.isvalid = true
      }
  })
  }
  callmint= async (title,description, owner) => {

    const sendData ={
      email: owner
    }
    await this.callPhp_patientEmailToPublickey(sendData)
    console.log("in "+this.state.isvalid)
    if(this.state.isvalid){
      console.log("in "+this.state.ownerAddress)
      await this.props.mintRecord(title,description, this.state.ownerAddress);
    }
    else{
      document.getElementById("rec").innerHTML = "invalid email id";
    }
      

  };

  render() {
    return (
      <div className="mt-4">

         <div>
        
         <form
          onSubmit={(e) => {
            e.preventDefault();
            this.callmint(
              this.state.title,
              this.state.description,
              this.state.owner
            );
          }}
        >
          <div className="form-group mt-4 ">
            <label htmlFor="title">
              <span className="font-weight-bold">Title</span> :
            </label>{" "}
            <input
              required
              type="text"
              name="title"
              id="title"
              value={this.state.title}
              className="form-control w-50"
              placeholder="Enter record title"
              onChange={(e) =>
                this.setState({
                    title: e.target.value,
                })
              }
            />
            
          </div>
          <div className="form-group mt-4 ">
            <label htmlFor="description">
              <span className="font-weight-bold">Description</span> :
            </label>{" "}
            <input
              required
              type="text"
              name="description"
              id="description"
              value={this.state.description}
              className="form-control w-50"
              placeholder="Enter record description"
              onChange={(e) =>
                this.setState({
                    description: e.target.value,
                })
              }
            />
            
          </div>
            <div className="form-group mt-4 ">
            <label htmlFor="owner">
              <span className="font-weight-bold">Owner Address</span> :
            </label>{" "}
            <input
              required
              type="text"
              name="owner"
              id="owner"
              value={this.state.owner}
              className="form-control w-50"
              placeholder="Enter owner Address"
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
            Create Record
          </button>
        </form>
        <div id="rec"></div>

      </div>
    </div>
    );
  }
}

export default CreateRecord;

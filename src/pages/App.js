import React, { Component,createContext,useReducer }  from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Web3 from "web3";
import MedInfo from '../abis/MedInfo.json'

import './App.css';
import Header from './Header';
//import Login from './Login';
import Home from './Home';
//import Register from './Register';

import ViewingPermissionStatus from './ViewingPermissionStatus';
import ViewMyRecords from './ViewMyRecords';
import GivePermission from './GivePermission';
import ConnectToMetamask from './ConnectToMetamask';
import ContractNotDeployed from './ContractNotDeployed';
import Loading from './Loading';
import CreateRecord from './CreateRecord';
import RevokePermission from './RevokePermission';
import GivePermissionForOthers from './GivePermissionForOthers';
import EmergencyUser from './EmergencyUser';
//import HospitalRegister from './HospitalRegister';
//import Footer from './Footer'

import Patient_Home from './Home/Patient_home';
import Hospital_Home from './Home/Hospital_home';
import Insurance_Home from './Home/Insurance_Home';

import Doctor_Register from './register/Doctor_register';
import Patient_Register from './register/Patient_Register'
import Register_Type from './register/Register_Type';
import Hospital_Register from './register/Hospital_register';

import Doctor_home from './Home/Doctor_home';
import Patient_Login from './Login/Patient_Login';
import Login_Type from './Login/Login_type';
import ViewRecords from './ViewRecords';

const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient.create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      MedInfoContract: null,
      MedInfoCount: 0,
      records: [],
      othersRecord : [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      status:false
      //nameIsUsed: false,
      //colorIsUsed: false,
     // colorsUsed: [],
     // lastMintTime: null,
    };
    
  }
  
  componentWillMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
  };
  
  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
   
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      this.setState({ loading: false });
      const networkId = await web3.eth.net.getId();
      const networkData = MedInfo.networks[networkId];
      if (networkData) {
        this.setState({ loading: true });
        const MedInfoContract = new web3.eth.Contract(
          MedInfo.abi,
          networkData.address
        );
        this.setState({ MedInfoContract });
        this.setState({ contractDetected: true });
        const MedInfoCount = await MedInfoContract.methods
          .InfoCounter()
          .call();
        this.setState({ MedInfoCount });

        for (var i = 1; i <= MedInfoCount; i++) {
          const medInfo = await MedInfoContract.methods
            .allRecords(i)
            .call();
         if(medInfo.ownedBy === this.state.accountAddress){
            this.setState({
            records: [...this.state.records, medInfo],
          });
        }
         
        }
        console.log(this.state.accountAddress)
       // console.log(this.state.records)
      this.setState({ loading: false });
      } else {
        this.setState({ contractDetected: false });
      }
    }
  };
  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };
  
  giveViewPermission = (requester,owner) => {
    this.setState({ loading: true });
    this.state.MedInfoContract.methods
      .giveViewPermission(requester,owner)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };
  giveEditPermission = (requester,owner) => {
    this.setState({ loading: true });
    this.state.MedInfoContract.methods
      .giveEditPermission(requester,owner)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };
  
  revokeViewPermission = (requester) => {
    this.setState({ loading: true });
    this.state.MedInfoContract.methods
      .revokeViewPermission(requester)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };
  revokeEditPermission = (requester) => {
    this.setState({ loading: true });
    this.state.MedInfoContract.methods
      .revokeEditPermission(requester)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

  getEditPermissionStatus= async (editer) => {
    let status = await this.state.MedInfoContract.methods
      .getEditPermissionStatus(editer).call({ from: this.state.accountAddress });
      return status;
  };
  getViewPermissionStatus= async (viewer) => {
    let status = await this.state.MedInfoContract.methods
      .getViewPermissionStatus(viewer).call({ from: this.state.accountAddress });
      return status;
  };
  setEmergencyUser= (emergencyUser) => {
    this.setState({ loading: true });
    this.state.MedInfoContract.methods
      .setEmergencyUser(emergencyUser).send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };
  getEmergencyUser= async () => {
    let user = await this.state.MedInfoContract.methods
     .getEmergencyUser().call({ from: this.state.accountAddress });
     return user;
 };
  mintRecord = async (title, description, owner) => {
    this.setState({ loading: true });
    let p = await this.state.MedInfoContract.methods
      .getEditPermissionStatus( this.state.accountAddress ).call({ from: owner });
    
    if(p){
      await this.state.MedInfoContract.methods
      .mint(title,description,owner).send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        
        window.location.reload();
      });
      return "Record created successfully"
    }
      else{
           return "You don't have permission to create record"
      }    
    };
  viewRecords = async (viewer,owner) => {
    let status = await this.state.MedInfoContract.methods
      .getViewPermissionStatus(viewer).call({ from:owner});
      this.state.othersRecord = []
      if(status){
        for (var i = 1; i <= this.state.MedInfoCount; i++) {
          const medInfo = await this.state.MedInfoContract.methods
            .allRecords(i)
            .call();
         if(medInfo.ownedBy === owner){
            this.setState({
            othersRecord: [...this.state.othersRecord, medInfo],
          });
        }
      }
    }
      else{
        return false
      }
  };
  clearRecords = async () => {
      this.state.othersRecord = []
      console.log(this.state.othersRecord)
      
  };
  
  render() {

  return (
    
    <div className='container'>
    {!this.state.metamaskConnected ? (
      <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
    ) : !this.state.contractDetected ? (
      <ContractNotDeployed />
    ) : this.state.loading ? (
      <Loading />
    ) : (
      <>
    <Router>
      <Header/>
      <Routes>
       <Route path ="/" element={<Home
       //records = {this.state.records}
       />} />

      <Route path ="/ViewMyRecords" element={<ViewMyRecords
      records = {this.state.records}
      />} />
       <Route path ="/ViewOthersRecords" element={<ViewMyRecords
      records = {this.state.othersRecord}
      />} />
       <Route path ="/CheckStatusInfo" element={<ViewingPermissionStatus
       getViewPermissionStatus = {this.getViewPermissionStatus}
       getEditPermissionStatus = {this.getEditPermissionStatus}
       />}/>
       <Route path ="/CreateRecord" element={<CreateRecord
       mintRecord = {this.mintRecord}
       />}/>
      <Route path ="/GivePermission" element={<GivePermission
       giveEditPermission = {this.giveEditPermission}
       giveViewPermission = {this.giveViewPermission}
       accountAddress = {this.state.accountAddress}
       />}/>
       
       <Route path ="/GivePermissionForOthers" element={<GivePermissionForOthers
       giveEditPermission = {this.giveEditPermission}
       giveViewPermission = {this.giveViewPermission}
       />}/>  
       <Route path ="/RevokePermission" element={<RevokePermission
       revokeViewPermission = {this.revokeViewPermission}
       revokeEditPermission = {this.revokeEditPermission}
       />}/> 
       <Route path ="/EmergencyUser" element={<EmergencyUser
       getEmergencyUser = {this.getEmergencyUser}
       setEmergencyUser = {this.setEmergencyUser}
       />}/> 
       <Route path ="/ViewRecords" element={<ViewRecords
       viewRecords = {this.viewRecords}
       clearRecords = {this.clearRecords}
      othersRecord = {this.state.othersRecord}
      accountAddress = {this.state.accountAddress}
      
      />} />
      
         <Route path ="/patient_login" element={<Patient_Login/>}/>
         <Route path ="/login_type" element={<Login_Type/>}/>
         <Route path ="/patient_register" element={<Patient_Register/>}/>
         <Route path ="/register_type" element={<Register_Type/>}/>
         <Route path ="/hospital_type" element={<Hospital_Register/>}/>
         <Route path ="/patient_home" element={<Patient_Home/>}/>
         <Route path ="/hospital_home" element={<Hospital_Home/>}/>
         <Route path ="/doctor_home" element={<Doctor_home/>}/>
         <Route path ="/insurance_home" element={<Insurance_Home/>}/>
         <Route path ="/doctor_register" element={<Doctor_Register/>}/>
      </Routes>

   </Router>
    </>
    )}
   </div>
  );
}
}

export default App;

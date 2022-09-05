// SPDX-License-Identifier: MIT
//pragma solidity >=0.4.21 <0.8.0;


import "./ERC721Full.sol";


contract MedInfo is ERC721Full {
  uint256 public InfoCounter;

   struct Record {
    address payable ownedBy;
    string title;
    string description;
    address payable createdBy;
  }
 
  mapping(uint256 => Record) public allRecords;
  mapping(address => address) public emergencyUser;
  mapping(address => mapping(address => bool)) public viewPermission;
  mapping(address => mapping(address => bool)) public editPermission;

 constructor() ERC721Full("MedInfoBlock", "medinfo") public{

  }
  function mint(string memory _title,string memory _description,address payable _ownedBy) public{
    require(msg.sender != address(0));
    require(editPermission[_ownedBy][msg.sender]); 
    Record memory newRecord = Record(
        _ownedBy,
        _title,
        _description,
        msg.sender
   );
    allRecords[++InfoCounter] = newRecord;  
    viewPermission[_ownedBy][_ownedBy] = true;   
 }

 function setEmergencyUser(address _user)public{
   require(msg.sender != address(0));
   emergencyUser[msg.sender]=_user;
 }
 function giveViewPermission(address _requester, address _owner)public{
   require(msg.sender != address(0));
   require(msg.sender==_owner || msg.sender==emergencyUser[_owner]);
   viewPermission[_owner][_requester]=true;
 }
 function giveEditPermission(address _requester, address _owner)public{
   require(msg.sender != address(0));   
   require(msg.sender==_owner || msg.sender==emergencyUser[_owner]);
   editPermission[_owner][_requester]=true;
 }

 
 function revokeEditPermission(address _requester)public{
   require(msg.sender != address(0));
   editPermission[msg.sender][_requester]=false;
 }
 function revokeViewPermission(address _requester)public{
   require(msg.sender != address(0));
   viewPermission[msg.sender][_requester]=false;
 }

function getEmergencyUser()public view returns(address){
   require(msg.sender != address(0));
   return emergencyUser[msg.sender];
 }
 function getViewPermissionStatus(address _requester)public view returns(bool){
   require(msg.sender != address(0));
   return  viewPermission[msg.sender][_requester];
 }
 function getEditPermissionStatus(address _requester)public view returns(bool){
   require(msg.sender != address(0));
   return  editPermission[msg.sender][_requester];
 }
 }
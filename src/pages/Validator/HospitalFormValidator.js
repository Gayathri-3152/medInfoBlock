
const validation = (data) => {
let errors ={};
if(!data.hospital_name){
	errors.hospital_name ="hospital name is required"
}
if(!data.type){
	errors.type ="type is required"
}
if(!data.address){
	errors.address ="address is required"
}
if(!data.hospital_email){
	errors.hospital_email="email is required"
}else if(!/\S+@\S+\.\S+/.test(data.hospital_email)){
	errors.hospital_email="email is invalid"
}
if(!data.reg_number){
	errors.reg_number ="hospital registration number is required"
}
if(!data.hosphn_number){
	errors.hosphn_number ="hospital phone number is required"
}
if(!data.node_name){
	errors.node_name ="nodal person name is required"
}
if(!data.node_email){
	errors.email="nodal person mail is required"
}else if(!/\S+@\S+\.\S+/.test(data.node_email)){
	errors.email="email is invalid"
}
if(!data.password){
	errors.password="password is required"
}else if(data.password.length < 8){
	errors.password="password must be more than or equal to 8 character"
}else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(data.password)){
	errors.password="password is weak"
}
if(!data.node_phn_number){
	errors.node_phn_number="phone number is required"
}else if(!/^[0-9\b]+$/){
	errors.node_phn_number ="not a valid phone number"
}else if(data.node_phn_number.length !=10){
	errors.node_phn_number="phone number length must be 10 "
}
if(!data.publickey){
	errors.publickey ="nodal person phone number is required"
}



return errors;


}
export default validation;
const validation = (data) => {
	let errors ={};
	if(!data.first_name){
		errors.first_name="first name is required"
	}
	if(!data.last_name){
		errors.last_name="last name is required"
	}
	if(!data.gender){
		errors.gender ="gender is required"
	}
	if(!data.email){
		errors.email="email is required"
	}else if(!/\S+@\S+\.\S+/.test(data.email)){
		errors.email="email is invalid"
	}
	if(!data.password){
		errors.password="password is required"
	}else if(data.password.length < 8){
		errors.password="password must be more than or equal to 8 character"
	}else if(!/^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])(?=.{8,})/.test(data.password)){
		errors.password="password is weak"
	}
	if(!data.phn_number){
		errors.phn_number="phone number is required"
	}else if(!/^[0-9\b]+$/){
		errors.phn_number ="not a valid phone number"
	}else if(data.phn_number.length !=10){
		errors.phn_number="phone number length must be 10 "
	}
	
	
	return errors;
	
	
	}
	export default validation;
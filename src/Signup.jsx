import React,{useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {useHistory} from 'react-router-dom';
import Login from './Login';
import Alert from './Alert';

const Signup = ({setAccessToken}) =>{
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [token, setToken] = useState('');

  const handleEmailChange = event =>{
    setEmail(event.target.value);
  }

  const handleNameChange = event =>{
    setName(event.target.value);
  }

  const handlePasswordChange = event =>{
    setPassword(event.target.value);
  }

  const handleConfirmPassword = event =>{
    setConfirmPassword(event.target.value);
  }

  const handleClick = event =>{
    event.preventDefault();
    console.log({email, name, password});
    if(password.length >= 8){
      if(password === confirmPassword){
        const body = {
          email: email,
          full_name: name,
          password: password,
          password_confirmation: confirmPassword
        }

        const config = {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }

        fetch('https://api.baseplate.appetiserdev.tech/api/v1/auth/register', config)
          .then(res =>{
            return res.json();
          })
          .then(json =>{
            if(!(json.success)){
              setAlertMessage(json.message);
              setAlertType("danger");
            }
            else if(json.success){
              setToken(json.data.access_token);
              setAccessToken(json.data.access_token);
              setAlertMessage("Your account has been created!");
              setAlertType("success");
            }
          })
      }
      //set alert type and message
      else{
        setAlertMessage("Confirm password is not same");
        setAlertType("danger");
      }
    }
    else{
      setAlertMessage("Password length should be minimum 8 characters long");
      setAlertType("danger");
    }
  }

  useEffect(() =>{
    if(alertType !== '' && alertMessage !== ''){
      setShowAlert(true);
    }
  }, [alertType, alertMessage])

  useEffect(() =>{
    if(token !== ''){
      history.push('/verify');
    }
  }, [token])
  return(
    <>
    {
      showAlert ? <Alert alertType = {alertType} message = {alertMessage}/> : null
    }
    <div id='signup-container'>
     <h5 className="indigo-text" style={{textAlign: 'center', marginBottom: '1em'}}>Register your account</h5>
     <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="z-depth-1 grey lighten-4 row" style={{display: "inline-block", padding: "32px 48px 0px 48px", border: "1px solid #EEE"}}>
        <form className="col s12">
           <div className='row'>
              <div className='col s12'>
              </div>
           </div>
           <div className='row'>
              <div className='input-field col s12'>
                 <input required className='validate' type='email' id='email' value = {email} onChange = {handleEmailChange}/>
                 <label>Email*</label>
              </div>
           </div>
           <div className='row'>
              <div className='input-field col s12'>
                 <input required className='validate' type='text' id='password' value = {name} onChange = {handleNameChange}/>
                 <label>Full Name*</label>
              </div>
           </div>
           <div className='row'>
              <div className='input-field col s12'>
                 <input required className='validate' type='password' id='confirm_password' value = {password} onChange = {handlePasswordChange}/>
                 <label>Password (min. 8 chars)*</label>
              </div>
           </div>
           <div className='row'>
              <div className='input-field col s12'>
                 <input required className='validate' type='password' name='password' id='password' value = {confirmPassword} onChange = {handleConfirmPassword}/>
                 <label>Password Again*</label>
              </div>
           </div>
           <div className='row'>
              <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo' style = {{color: "#FFF"}} onClick = {handleClick}>Register</button>
           </div>
        </form>
     </div>
     </div>
    </div>
    {
      // <Login show = {show}/>
    }
    </>
  )
}

export default Signup;

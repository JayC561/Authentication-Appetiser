import React,{useState, useEffect} from 'react';
import Alert from './Alert';
import {useHistory} from 'react-router-dom';

const Login = () =>{
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleEmailChange = event =>{
    setEmail(event.target.value);
  }

  const handlePasswordChange = event =>{
    setPassword(event.target.value);
  }

  const handleClick = event =>{
    event.preventDefault();
    const body = {
      username: email,
      password: password
    }

    const config = {
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }

    fetch('https://api.baseplate.appetiserdev.tech/api/v1/auth/login', config)
      .then(res =>{
        return res.json();
      })
      .then(json =>{
        if(json.success){
          setAlertMessage('Successfully logined!');
          setAlertType('success');
          history.push('/success');
        }

        else{
          setAlertMessage(json.message);
          setAlertType('danger');
        }
      })
  }

  useEffect(() =>{
    if(alertType !== '' && alertMessage !== ''){
      setShowAlert(true);
    }
  },[alertType, alertMessage])

    return(
      <>
        {
          showAlert ? <Alert alertType = {alertType} message = {alertMessage}/> : null
        }
        <div id='login-container'>
         <h5 className="indigo-text" style={{textAlign: 'center', marginBottom: '1em'}}>Login into your account</h5>
         <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="z-depth-1 grey lighten-4 row" style={{display: "inline-block", padding: "32px 48px 0px 48px", border: "1px solid #EEE"}}>
            <form className="col s12" method="post">
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
                     <input required className='validate' type='password' id='confirm_password' value = {password} onChange = {handlePasswordChange}/>
                     <label>Password*</label>
                  </div>
               </div>
               <br />
               <div className='row'>
                  <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo' style = {{color: "#FFF"}} onClick = {handleClick}>Login</button>
               </div>
            </form>
         </div>
         </div>
        </div>
      </>
    )
}

export default Login;

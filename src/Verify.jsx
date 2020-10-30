import React,{useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const Verify = ({token}) =>{
  const history = useHistory();
  useEffect(() =>{
    const body = {
    token: "00000",
    via: "email"
  }
  const config = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + token
    },
    body: JSON.stringify(body)
  }
  fetch('https://api.baseplate.appetiserdev.tech/api/v1/auth/verification/verify', config)
    .then(res =>{
      return res.json();
    })
  .then(json =>{
    if(json.data.verified){
      document.getElementsByClassName('circle-loader')[0].classList.add('load-complete')
      document.getElementsByClassName('checkmark')[0].style.display = 'block';
      history.push('/login');
    }
  })
    // setTimeout(() =>{
    //   document.getElementsByClassName('circle-loader')[0].classList.add('load-complete')
    //   document.getElementsByClassName('checkmark')[0].style.display = 'block';
    // }, 2000)
  },[])
  return(
    <>
      <div className="circle-loader">
        <div className="checkmark draw"></div>
      </div>
    </>
  )
}

/*
const [time, setTime] = useState(10);
const [timerID, setTimerID] = useState('');
useEffect(() =>{
  const rowHeight = document.getElementById('verify-container').offsetHeight;
  const emailFieldHeight = document.getElementById('email-field').offsetHeight;
  document.getElementById('resend-container').style.height = emailFieldHeight + "px";
  const resendButton = document.getElementById('resend-button');
  resendButton.style.cursor = "not-allowed";
  document.getElementById('input-field-container').style.height = rowHeight + "px";
  setTimerID(setInterval(() =>{
      setTime(prevState => prevState - 1);
    },1000)
  )
},[]);

useEffect(() =>{
  if(time <= 0){
    clearInterval(timerID);
    const resendButton = document.getElementById('resend-button');
    resendButton.style.cursor = "pointer";
    resendButton.classList.remove("grey");
    setTime('');
  }
},[time])
return(
  <div id='login-container'>
   <h5 className="indigo-text" style={{textAlign: 'center', marginBottom: '1em'}}>Verify your account</h5>
   <div className="container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="z-depth-1 grey lighten-4 row" style={{display: "inline-block", padding: "32px 48px 0px 48px", border: "1px solid #EEE"}}>
      <form className="col s12" method="post">
         <div className='row'>
            <div className='col s12'>
            </div>
         </div>
         <div id = 'verify-container' className='row'>
            <div id = 'input-field-container' className='input-field col s6 align-center-vertically-flex' style = {{marginTop: 0}}>
               <input className='validate' type='email' name='email' id='email-field' style = {{marginBottom: 0}}/>
               <label>Verification Code</label>
            </div>
            <div id = 'resend-container' className = 'col s6' style = {{position: "relative"}}>
              <button id = 'resend-button' type='submit' name='btn_login' className='col s12 btn waves-effect grey lighten-1 align-center-vertically' style={{textTransform: "none", color: "rgb(51, 51, 51)"}}>
                <i class="material-icons left">autorenew</i>
                Resend {time}
              </button>
            </div>
         </div>
         <br />
         <div className='row'>
            <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo' style = {{color: "#FFF"}}>Verify</button>
         </div>
      </form>
   </div>
   </div>
  </div>
)
*/

export default Verify;

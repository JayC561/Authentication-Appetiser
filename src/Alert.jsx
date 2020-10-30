import React,{useEffect} from 'react';

const Alert = ({alertType, message}) =>{
  useEffect(() =>{
    const alertBox = document.getElementById('alert-box');
    alertBox.classList.toggle('d-block');
    setTimeout(() =>{
      alertBox.classList.toggle('d-block');
    }, 3000)
  }, [alertType, message])
  return(
    <div id = 'alert-messages-container'>
      {
        alertType === "danger"
          ?
          <div className = 'alert alert-danger center-align' id = 'alert-box'>
            {message}
          </div>
          :
          <div className = 'alert alert-success center-align' id = 'alert-box'>
            {message}
          </div>
      }
    </div>
  )
}

export default Alert;

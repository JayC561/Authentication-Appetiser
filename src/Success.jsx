import React from 'react';

const Success = () =>{
  return(
    <>
      <div className = "container" style = {{display: "flex", justifyContent: "center", padding: "5em"}}>
        <div className = "container__left" style = {{display: "flex", justifyContent: "center", padding: "2em"}}>
          <i class="large material-icons" style = {{color: "green"}}>check</i>
        </div>
        <div className = "container__right" style = {{display: "flex", flexDirection: "column" ,justifyContent: "center", alignItems: "center", padding: "2em"}}>
          <h2>LOGINED SUCCESSFULLY</h2>
          <h4>You have been successfully logined into your account!</h4>
        </div>
      </div>
    </>
  )
}

export default Success;

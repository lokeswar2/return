import React from 'react'
import google from '../asserts/google.png'

function Login() {
  const googleAuth =()=>{
    window.open(`http://localhost:8000/auth/google/callback`, "_self");
  }
  return (
    <div className='vh-100 d-flex text-center justify-content-center align-items-center'>
    <div>
    <h1 className="text-primary mb-6 my-5">Login with Google</h1>
      <div className="card shadow " onClick={googleAuth}>
        <div className="card-body fs-2 ">
        Login in with
          <img src={google} height="50px" className='ps-2' />

        </div>
      </div>

    </div>
    </div>
  )
}

export default Login
import React, {useState} from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import success from '../asserts/success.png'


function Questions() {
    const [orderID,setName]=useState('')
    const [email,setEmail]=useState('')
    const [age,setAge]=useState('')
    const [mobile,setMobile]=useState('')
    const [role,setRole]=useState('')
    const [submitted,setSubmitted]=useState(false )
    const [submittedMsg,setSubmittedMsg]=useState('')

    let { id } = useParams();

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(orderID==''||email==''||age==''||mobile==''||role==''){
          alert("Please fill all the input fields");
          return;
        }
        console.log(orderID,email,age,mobile,role);
        await axios({
      method: 'post',
      url: `https://return-1.onrender.com/question/${id}`,
      data: {orderID,email,age,mobile,role}
    }).then(res => {  
        console.log(res);
        setSubmittedMsg(res.data);
        setSubmitted(true);
    })
    }
  return (
    <div className="p-5">
      {!submitted ?
      <div>
      <h1>Return application</h1>
      {id=='user'?
      <div className="card shadow">
        <div className="card-body px-4">
            <label htmlFor="" className="form-lable mt-3">OrderID</label>
            <input type="text" className="form-control my-3" placeholder="Enter your OrderID" value={orderID} onChange={(e)=>setName(e.target.value)} />
            <label htmlFor="" className="form-lable mt-3">Email</label>
            <input type="text" className="form-control my-3" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            {/* <label htmlFor="" className="form-lable mt-3">Age</label> */}
            <input type="text" className="form-control my-3" placeholder="Enter your age" value={age} onChange={(e)=>setAge(e.target.value)} />
            <label htmlFor="" className="form-lable mt-3">Mobile Number</label>
            <input type="text" className="form-control my-3" placeholder="Enter your mobile number" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
            {/* <label className="form-label mt-3">Which option best describes you?</label>
            <select className="form-select my-3" value={role} onChange={(e)=>setRole(e.target.value)} >
            <option value="student">return</option>
            <option value="intern">replacement</option> */}
            {/* <option value="professional">Professional</option>
            <option value="other">Other</option> */}
            {/* </select> */}
            <button className="btn btn-primary my-4" onClick={onSubmit}>Submit</button>
        </div>
      </div>:
      <div className="card shadow">
        <div className="card-body px-4">
            <label htmlFor="" className="form-lable mt-3">Admin Name</label>
            <input type="text" className="form-control my-3" placeholder="Enter your orderID" value={orderID} onChange={(e)=>setName(e.target.value)} />
            <label htmlFor="" className="form-lable mt-3">Admin Email</label>
            <input type="text" className="form-control my-3" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <label htmlFor="" className="form-lable mt-3">Admin Age</label>
            <input type="text" className="form-control my-3" placeholder="Enter your age" value={age} onChange={(e)=>setAge(e.target.value)} />
            <label htmlFor="" className="form-lable mt-3">Admin Mobile Number</label>
            <input type="text" className="form-control my-3" placeholder="Enter your mobile number" value={mobile} onChange={(e)=>setMobile(e.target.value)} />
            <label className="form-label mt-3">Which option best describes you?</label>
            {/* <select className="form-select my-3" value={role} onChange={(e)=>setRole(e.target.value)} >
            <option value="student">Student</option>
            <option value="intern">Intern</option>
            <option value="professional">Professional</option>
            <option value="other">Other</option>
            </select> */}
            <button className="btn btn-primary my-4" onClick={onSubmit}>Submit</button>
        </div>
      </div>
      }
      </div>:
      <div className="vh-100 d-flex text-center justify-content-center align-items-center">
      <div>
      <h2 className="text-muted my-5">
          Form submitted successfully
        </h2>
        <img src={success} alt="" height="80px" />
      </div>
      </div>
    }

     
    </div>
  );
}

export default Questions;

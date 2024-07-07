import React, { useState } from "react";
import { addOne } from './services/students'
const AddStudent = () => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addOne({ fullName: name, email: email });
      console.log('ok', response);
      setName('');
      setEmail('');
    } catch (error) {
      console.log('error', error);
    }
    // console.log(name,email)
  };
  return (
<div className="container">
  <form onSubmit={handleSubmit}>
  <div className="form-group row">
    <label htmlFor="fullName" className="col-sm-2 col-form-label">Full Name</label>
    <div className="col-sm-10">
      <input type="text"
             className="form-control" 
             id="fullName" 
             placeholder="Full Name"
             name="fullName"
             value={name}
             onChange={(e) => setName(e.target.value)} />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" 
            className="form-control" 
            id="email" 
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
    </div>
  </div>
  <div className="form-group row">
    <div className="col-sm-10">
      <button type="submit" className="btn btn-primary">Sign in</button>
    </div>
  </div>
</form>
    </div>
  );
};
export default AddStudent
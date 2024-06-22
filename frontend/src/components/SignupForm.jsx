import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import validateManyFields from '../validations';
import Input from './utils/Input';
import Loader from './utils/Loader';

const SignupForm = () => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });

  }

  const fieldError = (field) => (
    <p className={`mt-1 text-red-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className='m-auto my-16 sm:max-w-[500px] max-w-[300px] p-8 bg-gray-700 border-2 border-gray-600  shadow-md rounded-md flex flex-col justify-center items-center text-white'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4 text-2xl font-bold'>Signup Here</h2>
            <div className="mb-4 w-full">
              <label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
              <Input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} className='text-white bg-gray-600 border-gray-800 placeholder-gray-400' />
              {fieldError("name")}
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="email" className="after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
              <Input type="text" name="email" id="email" value={formData.email} placeholder="youremail@domain.com" onChange={handleChange} className='bg-gray-600 border-gray-800' />
              {fieldError("email")}
            </div>

            <div className="mb-4 w-full">
              <label htmlFor="password" className="after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
              <Input type="password" name="password" id="password" value={formData.password} placeholder="Your password.." onChange={handleChange} className='bg-gray-600 border-gray-800' />
              {fieldError("password")}
            </div>

            <button className='bg-primary rounded text-white px-12 py-2 font-medium hover:bg-primary-dark' onClick={handleSubmit}>Submit</button>

            <div className='pt-4 flex gap-2'>
              <p className='text-gray-100'>Already have an account? </p>
              <Link to="/login" className='text-red-400'>Login here</Link>
            </div>
          </>
        )}

      </form>
    </>
  )
}

export default SignupForm
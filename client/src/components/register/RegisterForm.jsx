import React, { useState } from "react";

const initialValues = {
    name: "",
    email: "",
    password: "",
    country:"",
    gender:"other",
    terms: false
}

function validate(values){
  let errors = {};

  if(!values.name)
    errors['name'] = 'Full name is required';

  if(!values.email)
    errors['email'] = 'Email is required';

  if(!values.password)
    errors['password'] = 'Password is required';

  if(!values.country)
    errors['country'] = 'Country is required';

  if(values.terms === false)
    errors['terms'] = 'Age validation required';

  return errors;
}

export default function RegisterForm() {
    const [data,setData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched,setTouched] = useState({});

    const changeHandler = (e) =>{
        setData((state) => ({
            ...state,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }));
    };

    const submitAction = (e) => {
      const validationErrors = validate(data);
      setErrors(validationErrors);
      setTouched(errors);

      if (Object.keys(validationErrors).length > 0) {
          return;
      }
      setData(initialValues);
      setErrors({});
  }

    const inputClass = (field) => `${errors[field] && touched[field] 
    ? 'border-2 border-red-600 bg-red-950/60 animate-shake focus:border-red-400 shadow-error-icon' 
    : data[field] 
    ? 'border-2 border-green-600 bg-green-950/25 focus:border-green-400 shadow-success-icon' 
    : 'border border-gray-400 bg-zinc-900/70'} px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder:italic placeholder:text-lg placeholder-white text-white transition`;

    const validationHandler = (e) =>{
      setTouched((state)=>({
        ...state,
        [e.target.name]: true
      }));

      const errors = validate(data);
      setErrors(errors);
    }

  return (
    <div className="register-form-animate flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-red-900 relative overflow-hidden">
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 h-24 bg-red-900 blur-3xl opacity-20 pointer-events-none z-0" />
      <form action={submitAction} className="relative z-10 bg-zinc-950/90 ring-2 ring-red-800 shadow-2xl backdrop-blur-xl p-10 md:p-12 rounded-3xl w-full max-w-lg flex flex-col space-y-8">       
        <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-red-700 via-yellow-700 to-red-900 bg-clip-text text-center mb-2 drop-shadow-lg uppercase tracking-widest">Sign Up</h2>
        
        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-lg font-bold text-red-400">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={data.name}
            onChange={changeHandler}
            onBlur={validationHandler}
            placeholder="John Doe"
            className={
              `${inputClass('name')} pr-10 relative`
            }
          />
          {errors.name && touched.name && (
            <span className="flex items-center gap-1 text-red-400 text-sm mt-1 bg-red-900/40 px-2 py-0.5 rounded shadow"><svg aria-hidden="true" focusable="false" className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>{errors.name}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-lg font-bold text-red-400">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={changeHandler}
            onBlur={validationHandler}
            placeholder="you@example.com"
            className={
              `${inputClass('email')} pr-10 relative`
            }
          />
          {errors.email && touched.email && (
            <span className="flex items-center gap-1 text-red-400 text-sm mt-1 bg-red-900/40 px-2 py-0.5 rounded shadow"><svg aria-hidden="true" focusable="false" className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>{errors.email}</span>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="password" className="text-lg font-bold text-red-400">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            onBlur={validationHandler}
            placeholder="••••••••"
            className={
              `${inputClass('password')} pr-10 relative`
            }
          />
          {errors.password && touched.password && (
            <span className="flex items-center gap-1 text-red-400 text-sm mt-1 bg-red-900/40 px-2 py-0.5 rounded shadow"><svg aria-hidden="true" focusable="false" className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>{errors.password}</span>
          )}
        </div>     

        {/* Gender */}
        <div className="flex flex-col space-y-2 pt-3 pb-2">
          <span className="text-lg font-bold text-red-400 pb-1">Gender</span>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-1 font-semibold text-red-200">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={data.gender === 'male'}
                onChange={changeHandler}
                onBlur={validationHandler}
                className="accent-red-600 scale-110 mr-1"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-1 font-semibold text-yellow-400">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={data.gender === 'female'}
                onChange={changeHandler}
                onBlur={validationHandler}
                className="accent-yellow-400 scale-110 mr-1"
              />
              <span>Female</span>
            </label>
            <label className="flex items-center space-x-1 font-semibold text-gray-400">
              <input
                type="radio"
                name="gender"
                value="other"
                checked={data.gender === 'other'}
                onChange={changeHandler}
                onBlur={validationHandler}
                className="accent-gray-500 scale-110 mr-1"
              />
              <span>Other</span>
            </label>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-4 mt-1">
          <input
            id="terms"
            type="checkbox"
            name="terms"
            checked={data.terms}
            onChange={changeHandler}
            onBlur={validationHandler}
            className={`accent-red-700 scale-110 shadow-md ${errors.terms && touched.terms ? 'ring ring-red-700 bg-red-950/40 animate-shake' : ''}`}
          />
          <label htmlFor="terms" className="font-semibold text-lg text-yellow-400">I am 18 years old or older</label>
        </div>
        {errors.terms && touched.terms && (
          <span className="flex items-center gap-1 text-red-400 text-sm mt-1 bg-red-900/40 px-2 py-0.5 rounded shadow"><svg aria-hidden="true" focusable="false" className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><circle cx="12" cy="16" r="1"/></svg>{errors.terms}</span>
        )}
        <button
          type="submit"
          className="bg-gradient-to-r from-red-700 via-yellow-700 to-red-900 shadow-xl hover:from-yellow-700 hover:via-red-700 hover:to-yellow-900 focus:ring-4 focus:ring-yellow-700 text-white font-bold text-lg py-2 rounded-xl transition-transform duration-200 hover:scale-105 hover:animate-pulse border-none outline-none drop-shadow-xl uppercase tracking-wider"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

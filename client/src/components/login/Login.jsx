import React, { useState } from "react";
import { Link } from "react-router";

const initialValues = {
    email: "",
    password: "",
}

function validate(values){
  let errors = {};

  if(!values.email)
    errors['email'] = 'Email is required';

  if(!values.password)
    errors['password'] = 'Password is required';

  return errors;
}

export default function Login() {
    const [data,setData] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched,setTouched] = useState({});

    const changeHandler = (e) =>{
        setData((state) => ({
            ...state,
            [e.target.name]: e.target.value
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
        <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-red-700 via-yellow-700 to-red-900 bg-clip-text text-center mb-2 drop-shadow-lg uppercase tracking-widest">Login</h2>
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
        <button
          type="submit"
          className="bg-gradient-to-r from-red-700 via-yellow-700 to-red-900 shadow-xl hover:from-yellow-700 hover:via-red-700 hover:to-yellow-900 focus:ring-4 focus:ring-yellow-700 text-white font-bold text-lg py-2 rounded-xl transition-transform duration-200 hover:scale-105 hover:animate-pulse border-none outline-none drop-shadow-xl uppercase tracking-wider"
        >
          Login
        </button>
        <div className="text-sm font-medium text-zinc-300 text-center mt-4">
          Not registered?{' '}
          <Link
            to="/register"
            className="inline-block text-transparent bg-gradient-to-r from-red-400 via-yellow-400 to-red-700 bg-clip-text font-bold hover:underline hover:text-yellow-400 transition-colors duration-200"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
}

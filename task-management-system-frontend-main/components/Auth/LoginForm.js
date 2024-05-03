"use client";
import React, { useState , useEffect} from "react";
import Cookies from 'js-cookie';
import { redirect, useRouter } from "next/navigation";


const InputField = ({ label, type = 'text', name, id, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={name}
      placeholder={label}
      className="py-3 px-4 bg-gray-100 text-2xl border mt-3 border-gray-300 rounded-2xl focus:outline-none focus:ring focus:ring-blue-400"
      value={value}
      onChange={onChange}
    />
  </div>
);
function LoginForm() {
  const router = useRouter();


  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  // if(Cookies.get("authToken")!==null)redi
  const [role,setrole]=useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false); // New state variable for login error
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    try {
        const myHeaders = new Headers();
        myHeaders.append("username", username);
        myHeaders.append("password", password);
        myHeaders.append("Content-Type", "application/json");
        
        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };
        const response = await fetch("http://localhost:8081/signIn", requestOptions);
        if (response.ok) {
          const responseData = await response.json();
          const authToken = responseData.token;
          Cookies.set('authToken', authToken);
          // cookies.set('authToken', authToken);
          setFormSubmitted(true);
          console.log(responseData);
          setrole(responseData.role);
          
        } else {
          setLoginError(true); // Set login error state to true
        }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  if (formSubmitted) {
    if(role==0)
    redirect("/user");
    
    else if(role==1)
    redirect("/TaskManagement")
    //return <div>Thank you for signing up!</div>;
    else redirect("/login");
  }
  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <form
        className="flex flex-col justify-center px-12 py-12 text-xs bg-orange-400 rounded-3xl shadow-2xl text-zinc-800 sm:px-10 lg:px-16 xl:px-20 h-auto mt-10 sm:mt-0 max-w-md w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl"
        onSubmit={handleSubmit}
      >
        {loginError && ( // Display error message if loginError state is true
          <div className="text-black text-lg font-semibold mb-4 text-center">Invalid Credentials</div>
        )}
        <header className="mt-14 text-5xl pb-7 font-semibold text-white">Login</header>
        <section className="flex gap-2 w-full flex-col justify-between mt-2 whitespace-nowrap text-zinc-900">
          <InputField
            label="username"
            type="username"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </section>
        <section className="flex gap-2 w-full flex-col justify-between mt-2 whitespace-nowrap text-zinc-900">
          <InputField
            label="Password"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </section>
        <button
          type="submit"
          className="w-full py-3 px-6 mt-6 bg-orange-300 text-white text-2xl rounded-3xl hover:bg-orange-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Login
        </button>
        <footer className="mt-1.5 text-[1rem] text-center text-gray-600 whitespace-nowrap">
          <span className="leading-normal">Don't have an account? </span>
          <a href="/signup" className="leading-normal  text-blue-800">
            Sign up
          </a>
        </footer>
      </form>
    </div>
  );
}
export default LoginForm;
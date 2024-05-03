"use client";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const InputField = ({ label, type = "text", name, id, value, onChange }) => (
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

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [signupError, setSignupError] = useState(false); // New state variable for signup error
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, username, password } = formData;

    try {
      const response = await fetch('http://localhost:8081/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({"name": name,
        "username": username,
        "password": password })
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData);
        setFormSubmitted(true);
        redirect("/login");

      } else {
        setSignupError(true); // Set signup error state to true
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  if (formSubmitted) {
    redirect("/login");
    //return <div>Thank you for signing up!</div>;
    
  }

  return (
    <div className="flex justify-center items-center bg-gray-100 h-screen">
      <form
        className="flex flex-col justify-center px-12 py-12 text-xs bg-orange-400 rounded-3xl shadow-2xl text-zinc-800 sm:px-10 lg:px-16 xl:px-20 h-auto mt-10 sm:mt-0 max-w-md w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl"
        onSubmit={handleSubmit}
      >
        {signupError && (// Display error messagecif signupError state is true
          <div className="text-black text-lg text-center font-semibold mb-1">User already exists</div>
        )}
        <header className="mt-14 text-5xl pb-7 font-semibold text-white">Sign up</header>
        <div className="">
          <section className="flex gap-2 w-full flex-col rounded-3xl mt-3.5 whitespace-nowrap text-zinc-900">
            <InputField
              label="name"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </section>
        </div>

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
        <section className="flex gap-2 w-full flex-col mt-2 whitespace-nowrap text-zinc-900">
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        </section>

        <button
          type="submit"
          className="w-full py-3 px-6 mt-6 bg-orange-300 text-white text-2xl rounded-3xl hover:bg-orange-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Create account
        </button>

        <footer className="mt-1.5 text-[1rem] text-center text-gray-600 whitespace-nowrap">
          <span className="leading-normal">Already have an account? </span>
          <a href="/login" className="leading-normal  text-blue-800">
            Login
          </a>
        </footer>
      </form>
    </div>
  );
};

export default SignUpForm;

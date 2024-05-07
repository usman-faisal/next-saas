'use client';

import Default from 'components/auth/variants/DefaultAuthLayout';
import InputField from 'components/fields/InputField';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signupUser } from 'supabase/authFunctions';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    rePassword: '',
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const valid = await validateForm();
    if (valid) {
      const { email, password, rePassword, ...meta } = formData;
      const { data, error } = await signupUser(email, password, meta);
      if (!error) redirect('/auth/sign-in');
    }
  };

  const validateForm = async () => {
    let tempErrors = { ...formErrors };
    let valid = true;
    Object.keys(formData).map((key) => {
      if (!formData[key]) {
        tempErrors = { ...formErrors, [key]: 'Field is required' };
        valid = false;
      }
    });
    if (
      formData.password &&
      formData.rePassword &&
      formData.password !== formData.rePassword
    ) {
      tempErrors = { ...formErrors, rePassword: 'Passwords dont match' };
    }
    setFormErrors(formErrors);
    return valid;
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);
  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-8 text-4xl font-bold text-navy-700 dark:text-white">
              Sign Up
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <InputField
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  label="Full Name"
                  onChange={handleInputChange}
                  state={formErrors.name ? 'error' : ''}
                />
              </div>
              <div className="mb-5">
                <InputField
                  id="phone"
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={handleInputChange}
                  state={formErrors.phone ? 'error' : ''}
                />
              </div>
              <div className="mb-5">
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  onChange={handleInputChange}
                  state={formErrors.email ? 'error' : ''}
                />
              </div>
              <div className="mb-5">
                <InputField
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleInputChange}
                  state={formErrors.password ? 'error' : ''}
                />
              </div>
              <div className="mb-5">
                <InputField
                  id="rePassword"
                  label="Re-Enter Password"
                  type="password"
                  name="rePassword"
                  placeholder="Re-enter your password"
                  onChange={handleInputChange}
                  state={formErrors.rePassword ? 'error' : ''}
                />
              </div>
              <div className="mb-3">
                <button
                  type="submit"
                  className="linear w-full rounded-xl bg-bluePrimary py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                >
                  Create User
                </button>
              </div>
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <a
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    href="/auth/sign-in"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      }
    />
  );
}

export default SignUp;

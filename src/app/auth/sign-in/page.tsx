'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import Checkbox from 'components/checkbox';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInUser } from 'supabase/authFunctions';
import useAuthStore from 'store/authStore';

function SignInDefault() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const authStore = useAuthStore();

  const handleEmailChange = (event) => {
    setError('');
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setError('');
    setPassword(event.target.value);
  };

  const loginUser = async () => {
    const user = await signInUser(email, password);
    await authStore.getUser();
    const plan = await authStore.getUserPlan();
    alert(plan);
    return user;
  };

  const handleSubmit = async () => {
    if (
      !email ||
      !password ||
      password.length < 8 ||
      !/\S+@\S+\.\S+/.test(email)
    ) {
      setError('Invalid Credientials');
      return;
    }
    const { error } = await loginUser();
    if (error) {
      setError(error.message);
    } else {
      router.push('/home/dashboard');
    }
  };

  return (
    <Default
      maincard={
        <div className="mb-16 mt-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
              Sign In
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600">
              Enter your email and password to sign in!
            </p>

            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              name="email"
              onChange={handleEmailChange}
            />

            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="Min. 8 characters"
              id="password"
              type="password"
              onChange={handlePasswordChange}
            />

            {error && <p className="capitalize text-red-500">{error}</p>}

            {/* Checkbox */}
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="mt-2 flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Keep me logged In
                </p>
              </div>
              <a
                className="text-sm font-medium text-bluePrimary hover:text-brand-600 dark:text-white"
                href=" "
              >
                Forgot Password?
              </a>
            </div>
            <button
              className="linear w-full rounded-xl bg-bluePrimary py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
              onClick={handleSubmit}
            >
              Sign In
            </button>
            <div className="mt-4">
              <span className="text-sm font-medium text-navy-700 dark:text-gray-500">
                Not registered yet?
              </span>
              <a
                href="/auth/sign-up"
                className="ml-1 text-sm font-medium text-bluePrimary hover:text-brand-600 dark:text-white"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;

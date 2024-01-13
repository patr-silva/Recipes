import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  type,
  onSubmit,
}) => {
  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img className='mx-auto h-10 w-auto' src={logo} alt='logo' />
        <h2 className='mt-10 text-center text-6xl  text-orange-400'>
          {type === 'Login' ? 'Welcome back!' : 'Welcome!'}
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={onSubmit}>
          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Username
            </label>
            <div className='mt-2'>
              <input
                id='username'
                value={username}
                type='text'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='password'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Password
              </label>
            </div>
            <div className='mt-2'>
              <input
                id='password'
                type='password'
                value={password}
                autoComplete='current-password'
                required
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-full bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200'
            >
              {type}
            </button>
          </div>
        </form>
        {type === "Login" ? (
          <p className='mt-10 text-center text-sm text-gray-900 '>
            Not a member?{" "}
            <Link
              to='/auth/register'
              className='font-semibold leading-6 text-orange-400 hover:underline'
            >
              Sign up
            </Link>
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Form;
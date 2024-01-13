import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { motion } from "framer-motion";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../images/logo.png";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <header className='bg-white'>
      <nav
        className='mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8'
        aria-label='Global'
      >
        <motion.div
          className='flex lg:flex-1'
          initial={{
            opacity: 0,

            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 2,
            },
          }}
    
        >
          <Link to='/' className='-m-1.5 p-1.5'>
            <img className='h-8 w-auto' src={logo} alt='logo' />
          </Link>
        </motion.div>
        <div className='flex lg:hidden'>
          <button
            type='button'
            className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className='h-6 w-6' aria-hidden='true' />
          </button>
        </div>
        <motion.div
          initial={{
            opacity: 0,

            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 2,
            },
          }}
        >
          <Popover.Group className='hidden lg:flex lg:gap-x-12'>
            <Link
              to='/'
              className='text-sm font-semibold leading-6 text-white rounded-full py-2 px-4  bg-orange-400'
            >
              Home
            </Link>
            <Link
              to='/recipes'
              className='text-sm font-semibold leading-6 text-white rounded-full py-2 px-4 bg-orange-400'
            >
              Recipes
            </Link>
            {cookies.access_token && (
              <>
                <Link
                  to='/create-recipe'
                  className='text-sm font-semibold leading-6 text-white rounded-full py-2 px-4 bg-orange-400'
                >
                  Create Recipe
                </Link>

                <Link
                  to='/saved-recipes'
                  className='text-sm font-semibold leading-6 text-white rounded-full py-2 px-4 bg-orange-400'
                >
                  My Recipes
                </Link>
              </>
            )}
          </Popover.Group>
        </motion.div>

        <motion.div
          className='hidden lg:flex lg:flex-1 lg:justify-end'
          initial={{
            opacity: 0,

            y: 80,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 2,
            },
          }}
        >
          {!cookies.access_token ? (
            <>
              <Link
                to='/auth/login'
                className='text-sm font-semibold leading-6 text-orange-400 rounded-full py-2 px-4 border-2 mr-4  border-orange-400  hover:bg-orange-400 hover:text-white'
              >
                Login
              </Link>
              <Link
                to='/auth/register'
                className='text-sm font-semibold leading-6 text-orange-400 rounded-full py-2 px-4 border-2 border-orange-400 hover:bg-orange-400 hover:text-white'
              >
                Sign up
              </Link>
            </>
          ) : (
            <button
              className='text-sm font-semibold leading-6 text-orange-400 rounded-full py-2 px-4 border-2 border-orange-300 hover:bg-orange-400 hover:text-white'
              onClick={logout}
            >
              Log out
            </button>
          )}
        </motion.div>
      </nav>
      <Dialog
        as='div'
        className='lg:hidden'
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className='fixed inset-0 z-10' />
        <Dialog.Panel className='fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='-m-1.5 p-1.5'>
              <img className='h-8 w-auto' src={logo} alt='logo' />
            </Link>
            <button
              type='button'
              className='-m-2.5 rounded-md p-2.5 text-gray-700'
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className='h-6 w-6' aria-hidden='true' />
            </button>
          </div>
          <div className='mt-6 flow-root'>
            <div className='-my-6 divide-y divide-gray-500/10'>
              <div className='space-y-2 py-6'>
                <Link
                  to='/'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300 hover:text-white'
                >
                  Home
                </Link>
                <Link
                  to='/recipes'
                  className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300 hover:text-white'
                >
                  Recipes
                </Link>
                {cookies.access_token && (
                  <>
                    <Link
                      to='/create-recipe'
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300 hover:text-white'
                    >
                      Share Recipe
                    </Link>
                    <Link
                      to='/saved-recipes'
                      className='-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300 hover:text-white'
                    >
                      My Recipes
                    </Link>
                  </>
                )}
              </div>
              <div className='py-6'>
                {!cookies.access_token ? (
                  <>
                    <Link
                      to='/auth/login'
                      className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300 hover:text-white'
                    >
                      Log in
                    </Link>
                    <Link
                      to='/auth/register'
                      className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300 hover:text-white'
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <p
                    className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-orange-300 hover:text-white'
                    onClick={logout}
                  >
                    Logout
                  </p>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;

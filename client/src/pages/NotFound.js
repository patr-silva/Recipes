import { Link } from "react-router-dom";
import image from "../images/404.jpg";

const NotFound = () => {
  return (
    <section className='bg-white'>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <img src={image} alt='404' />
          <Link
            to='/'
            className='text-base font-semibold leading-6 text-gray-900 rounded-full py-2 px-6 bg-amber-200'
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
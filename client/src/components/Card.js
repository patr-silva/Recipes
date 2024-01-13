import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ recipe }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg border-solid border-orange-400 border-2 hover:border-8'>
      <Link to={`/recipes/details/${recipe._id}`}>
        <img className='w-full h-3/5' src={recipe.imageUrl} alt='plate' />
        <div className='px-6 py-4'>
          <p className='text-xl mt-3 hover:text-orange-300 hover:underline hover:decoration-3'>
            {recipe.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Card;

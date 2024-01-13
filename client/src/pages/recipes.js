import { useState, useEffect } from "react";

import Card from "../components/Card.js";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("http://localhost:3002/recipes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipe();
  }, []);

  return (
    <div className='px-6 py-10 mt-[3%]'>
      {/* <h2 className='mb-20 text-center text-6xl leading-9 tracking-wide text-orange-400'>
        Recipes
      </h2> */}

      <div
        className='grid grid-cols-3 mx-[10%] gap-8'
        initial='hidden'
        animate='visible'
      >
        {recipes.map((elem, index) => {
          return <Card recipe={elem} />;
        })}
      </div>
    </div>
  );
};

export default Recipes;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";
import Card from "../components/Card.js";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserID();
  // eslint-disable-next-line
  const [cookies, _] = useCookies();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/recipes/saved-recipes/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.access_token,
            },
          }
        );

        const data = await response.json();
        setSavedRecipes(data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedRecipes();
  }, [cookies.access_token, userId]);

  return (
    <section className='px-6 py-6'>
      <h2 className='mt-10 mb-14 text-center text-6xl font-bold leading-9 tracking-tight text-orange-400'>
        My Recipes
      </h2>
      {savedRecipes.length > 0 && (
        <div className='grid grid-cols-3 mx-[10%] gap-8'>
          {savedRecipes.map((elem, index) => {
            return <Card recipe={elem} key={index} />;
          })}
        </div>
      )}
      {savedRecipes.length === 0 && (
        <div className='px-6 py-6 flex flex-col items-center justify-center'>
          <h2 className='mt-10 mb-7 text-center text-3xl leading-9 tracking-tight text-gray-700'>
            Start saving your favorite recipes!
          </h2>
          <Link
            to='/recipes'
            className='text-sm font-semibold leading-6 text-white rounded-full py-2 px-4 bg-orange-400 w-36 text-center'
          >
            Check Recipes
          </Link>
        </div>
      )}
    </section>
  );
};

export default SavedRecipes;

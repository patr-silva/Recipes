import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

const SingleRecipe = () => {
  const [recipe, setRecipe] = useState({
    _id: "",
    cookingTime: 0,
    imageUrl: "",
    ingredients: [],
    instructions: [],
    name: "",
    userOwner: "",
  });
  const [btn, setBtn] = useState("Save");
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const userId = useGetUserID();
  // eslint-disable-next-line
  const [cookies, _] = useCookies();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/recipes/details/${recipeId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        setRecipe(data.recipe);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const saveRecipe = async (recipeId) => {
    const data = { recipeId, userId };
    try {
      if (userId) {
        await fetch("http://localhost:3002/recipes", {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: cookies.access_token,
          },
          body: JSON.stringify(data),
        });
        setBtn("Saved");
      } else {
        toast.error("You must login first 🫣", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/auth/login");
        }, 2010);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const listOfIngredients = recipe.ingredients.map((elem, index) => {
    return (
      <li className='text-base border-none py-0.5 indent-4 leading-8' key={index}>
        - {elem};
      </li>
    );
  });

  const listOfInstructions = recipe.instructions.map((elem, index) => {
    return (
      <li className='text-base border-none py-0.5 indent-4 leading-8' key={index}>
         {elem};
      </li>
    );
  });

  return (
    <>
      <div className='py-8'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex place-content-center'>
            <h2 className='text-6xl mt-6 mb-16 text-orange-400 capitalize'>{recipe.name}</h2>
          </div>

          <div className='flex flex-col md:flex-row -mx-4'>

            <div className='md:flex-1 px-4'>

              <div>
                <span className='text-2xl text-orange-400 leading-10'>Ingredients:</span>
                <ul className='list-inside list-none mt-2'>
                  {listOfIngredients}
                </ul>
              </div>

              {/* <div className='mt-6'>
                <span className='text-2xl text-orange-400 leading-10'>Instructions:</span>
                <p className='text-base mt-2 mb-4 text-justify leading-8'>
                  {recipe.instructions}
                </p>
              </div> */}

              <div className='mt-6'>
                <span className='text-2xl text-orange-400 leading-10'>Instructions:</span>
                <ul className='list-inside list-decimal mt-2'>
                  {listOfInstructions}
                </ul>
              </div>

              <div className='flex mb-4 mt-6'>
                <div className='mr-4'>
                  <span className='text-2xl text-orange-400 leading-10'>
                    Cooking Time:
                  </span>
                  <span className='text-base ml-3'>
                    {" "}
                    {recipe.cookingTime} (minutes)
                  </span>
                </div>
              </div>
              <div className='flex justify-center -mx-2 mb-4 '>
                <button
                  onClick={() => {
                    saveRecipe(recipe._id);
                  }}
                  className='text-base font-semibold leading-6 text-white rounded-full py-2 px-6 bg-orange-400'
                >
                  {btn}
                </button>
              </div>
            </div>
            

            <div className='md:flex-1 px-4'>
              <div className='h-[360px] rounded-lg mb-4'>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className=' h-full'
                />
              </div>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRecipe;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import { toast } from "react-toastify";

import logo from "../images/logo.png";

const CreateRecipe = () => {
  // eslint-disable-next-line
  const [cookies, setCookies] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: [],
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addInstruction = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const handleInstructionChange = (event, index) => {
    const { value } = event.target;
    const instructions = [...recipe.instructions];
    instructions[index] = value;
    setRecipe({ ...recipe, instructions });
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await fetch("http://localhost:3002/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.access_token,
        },
        body: JSON.stringify(recipe),
      });

      toast.success("Recipe Created 🥳", {
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
        navigate("/recipes");
      }, 2010);
      //navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img className='mx-auto h-10 w-auto' src={logo} alt='logo' />
        <h2 className='mt-10 text-center text-6xl leading-9 tracking-tight text-orange-400'>
          Create Recipe
        </h2>
      </div>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form onSubmit={onSubmitHandler} className='space-y-6'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Name
            </label>
            <div className='mt-2'>
              <input
                type='text'
                id='name'
                name='name'
                value={recipe.name}
                onChange={handleChange}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='ingredients'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Ingredients
              </label>
            </div>
            <div className='mt-2'>
              {recipe.ingredients.map((elem, index) => (
                <input
                  type='text'
                  id='ingredients'
                  name='ingredients'
                  value={elem}
                  onChange={(event) => handleIngredientChange(event, index)}
                  key={index}
                  className='block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                />
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={addIngredient}
              type='button'
              className='flex w-full justify-center rounded-full bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200'
            >
              Add Ingredient
            </button>
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='instructions'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Instructions
              </label>
            </div>
            <div className='mt-2'>
              {recipe.instructions.map((elem, index) => (
                <textarea
                  type='text'
                  id='instructions'
                  name='instructions'
                  value={elem}
                  onChange={(event) => handleInstructionChange(event, index)}
                  key={index}
                  className='block w-full mb-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
                />
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={addInstruction}
              type='button'
              className='flex w-full justify-center rounded-full bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-200'
            >
              Add Step
            </button>
          </div>

          {/* <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='instructions'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Instructions
              </label>
            </div>
            <div className='mt-2'>
              <textarea
                type='text'
                id='instructions'
                name='instructions'
                value={recipe.instructions}
                onChange={handleChange}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
              />
            </div>
          </div> */}

          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='imageUrl'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Image
              </label>
            </div>
            <div className='mt-2'>
              <input
                type='text'
                id='imageUrl'
                name='imageUrl'
                value={CreateRecipe.imageUrl}
                onChange={handleChange}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <div className='flex items-center justify-between'>
              <label
                htmlFor='cookingTime'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Cooking Time (minutes)
              </label>
            </div>
            <div className='mt-2'>
              <input
                type='number'
                id='cookingTime'
                name='cookingTime'
                value={recipe.cookingTime}
                onChange={handleChange}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6'
              />
            </div>
          </div>
          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-full bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200'
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;

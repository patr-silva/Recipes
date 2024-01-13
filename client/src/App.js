import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import CreateRecipe from "./pages/create-recipe";
import SavedRecipes from "./pages/saved-recipes";
import Recipes from "./pages/recipes";
import SingleRecipe from "./pages/singleRecipe";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/recipes' element={<Recipes />} />
            <Route
              path='/recipes/details/:recipeId'
              element={<SingleRecipe />}
            />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/create-recipe' element={<CreateRecipe />} />
            <Route path='/saved-recipes' element={<SavedRecipes />} />
          </Route>
        </Routes>

        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </Router>
    </div>
  );
}

export default App;
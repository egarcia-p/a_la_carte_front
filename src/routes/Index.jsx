import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Home";
import Recipes from "../components/recipes/Recipes";
import Recipe from "../components/recipes/show/Recipe";
import NewRecipe from "../components/recipes/new/NewRecipe";
import Tags from "../components/tags/Tags";
import NewTag from "../components/tags/NewTag";
import EditTag from "../components/tags/EditTag";
import Categories from "../components/categories/Categories";
import NewCategory from "../components/categories/NewCategory";
import EditCategory from "../components/categories/EditCategory";
import Subcategories from "../components/subcategories/Subcategories";
import NewSubcategory from "../components/subcategories/NewSubcategory";
import EditSubcategory from "../components/subcategories/EditSubcategory";
import RecipeSteps from "../components/recipes/new/RecipeSteps";
import RecipeIngredients from "../components/recipes/new/RecipeIngredients";
import RecipeEquipments from "../components/recipes/new/RecipeEquipments";

export default (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/recipes" exact element={<Recipes />} />
      <Route path="/recipe/:id" exact element={<Recipe />} />
      <Route path="/recipe" exact element={<NewRecipe />} />
      <Route path="/tags" exact element={<Tags />} />
      <Route path="/tag" exact element={<NewTag />} />
      <Route path="/tag/:id" exact element={<EditTag />} />
      <Route path="/categories" exact element={<Categories />} />
      <Route path="/category" exact element={<NewCategory />} />
      <Route path="/category/:id" exact element={<EditCategory />} />
      <Route path="/subcategories" exact element={<Subcategories />} />
      <Route path="/subcategory" exact element={<NewSubcategory />} />
      <Route path="/subcategory/:id" exact element={<EditSubcategory />} />
      <Route path="/recipe_steps/:id" exact element={<RecipeSteps />} />
      <Route path="/recipe_ingredients/:id" exact element={<RecipeIngredients />} />
      <Route path="/recipe_equipments/:id" exact element={<RecipeEquipments />} />
    </Routes>
  </BrowserRouter>
);
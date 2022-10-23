import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../api'

export default function Recipes() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    getRecipes()
  }, [])

  const getRecipes = () => {
    API.get(`recipes/index`)
      .then((res) => {
        console.log(res)
        console.log(res.data)
        setRecipes(res.data)
      })
  }

  

  const getAllRecipes = (recipes) => {
    const allRecipes= recipes.map((recipe, index) => (
      
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={recipe.image}
            className="card-img-top"
            alt={`${recipe.title} image`}
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.title}</h5>
            <Link to={`/recipe/${recipe.id}`} className="btn custom-button">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    ))
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No recipes yet. Why not <Link to="/new_recipe">create one</Link>
        </h4>
      </div>
    )
    if (allRecipes === undefined){
      return noRecipe;
    }else {
      return allRecipes;
    }
  } 
  

  return (
    <>
      <section className="jumbotron jumbotron-fluid text-center">
        <div className="container py-5">
          <h1 className="display-4">Recipes for every occasion</h1>
          <p className="lead text-muted">
            We’ve pulled together our most popular recipes, our latest
            additions, and our editor’s picks, so there’s sure to be something
            tempting for you to try.
          </p>
        </div>
      </section>
      <div className="py-5">
        <main className="container">
          <div className="text-right mb-3">
            <Link to="/recipe" className="btn custom-button">
              Create New Recipe
            </Link>
          </div>
          <div className="row">
            {/* {recipes.length > 0 ? allRecipes : noRecipe} */}
            {recipes.length > 0? getAllRecipes(recipes): "Not Found"}
          </div>
          <Link to="/" className="btn btn-link">
            Home
          </Link>
        </main>
      </div>
    </>
  )
}

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Equipments from "./Equipments";
import Ingredients from "./Ingredients";
import Sections from "./Sections";

function Recipe() {
  let params = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const url = `/api/v1/recipes/show/${params.id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setRecipe(response))
      .catch(() => navigate("/recipes"));
  }, []);

  function deleteRecipe() {
    const url = `/api/v1/recipes/destroy/${params.id}`;
    const token = `$('meta[name="csrf-token"]').attr('content')`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/recipes"))
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={recipe.image}
          alt={`${recipe.title} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {recipe.title}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Ingredients</h5>
              {recipe.sections && <Ingredients sections={recipe.sections} />}
              <h5 className="mb-2">Special Equipments</h5>
              {recipe.sections && <Equipments sections={recipe.sections} />}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Preparation Instructions</h5>
            <div
            /*dangerouslySetInnerHTML={{
                      __html: `${recipeInstruction}`
                    }}*/
            />

            {recipe.sections && <Sections sections={recipe.sections} />}
          </div>
          <div className="col-sm-12 col-lg-2">
            <Link to={`/recipe_ingredients/${recipe.id}`}>
              <button type="button" className="btn btn-warning">
                Edit Ingredients
              </button>
            </Link>
            <Link to={`/recipe_steps/${recipe.id}`}>
              <button type="button" className="btn btn-warning">
                Edit Instructions
              </button>
            </Link>
            <Link to={`/recipe_equipments/${recipe.id}`}>
              <button type="button" className="btn btn-warning">
                Edit Special Equipments
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteRecipe}
            >
              Delete Recipe
            </button>
          </div>
        </div>
        <Link to="/recipes" className="btn btn-link">
          Back to recipes
        </Link>
      </div>
    </div>
  );
}

export default Recipe;

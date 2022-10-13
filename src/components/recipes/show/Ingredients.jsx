import React from "react";
import PropTypes from "prop-types";

const Ingredients = (props) => {
  const sections = props.sections; //TODO check if needed to declare as map
  //console.log(sections)
  return (
    <div>
      {sections.map((section, i) => (
        <Section key={i} section={section}></Section>
      ))}
    </div>
  );
};

const Section = (props) => {
  const section = props.section;


  if (section.recipe_ingredients.length > 0) {
    return (
      <div>
        <h3>{section.name}</h3>
        {section.recipe_ingredients.map((recipe_ingredient, i) => (
          <RecipeIngredient
            key={i}
            recipe_ingredient={recipe_ingredient}
          ></RecipeIngredient>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
};

const RecipeIngredient = (props) => {
  const recipeIngredient = props.recipe_ingredient;

  return (
    <div>
      {recipeIngredient.quantity} {(recipeIngredient.short_name || recipeIngredient.uom_name)} -{" "}
      {recipeIngredient.name}
    </div>
  );
};

Ingredients.propTypes = {
  sections: PropTypes.array,
};

Section.propTypes = {
  section: PropTypes.object,
};

RecipeIngredient.propTypes = {
  recipe_ingredient: PropTypes.object,
};

export default Ingredients;

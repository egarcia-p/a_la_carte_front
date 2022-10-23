import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'

const RecipeIngredient = (props) => {
  const recipe_ingredient = props.recipe_ingredient
  const section = props.section
  const sectionIndex = props.sectionIndex
  const ingredientIndex = props.ingredientIndex
  const setSectionsMap = props.setSectionsMap
  const listIngredients = props.listIngredients
  const listUoms = props.listUoms
  const [ingredientId, setIngredientId] = useState(
    recipe_ingredient.ingredient_id
  )
  const [ingredient, setIngredient] = useState(
    listIngredients.find((ing) => ing.id === recipe_ingredient.ingredient_id)
  )
  const [quantity, setQuantity] = useState(recipe_ingredient.quantity)
  const [uomId, setUOMId] = useState(recipe_ingredient.uom_id)
  const [uom, setUOM] = useState(
    listUoms.find((uom) => uom.id === recipe_ingredient.uom_id)
  )

  useEffect(() => {
    setIngredientId(recipe_ingredient.ingredient_id)
    setIngredient(recipe_ingredient.ingredient)
    setQuantity(recipe_ingredient.quantity)
    setUOMId(recipe_ingredient.uom_id)
    setUOM(recipe_ingredient.uom)
  }, [props.recipe_ingredient])

  const updateValueIngredientId = (selectedOption) => {
    const value = selectedOption.id
    setIngredientId(value)
    setIngredient(selectedOption)

    //Replace section ingredients
    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array

    const recipeIngredientsCopy = [...section.recipe_ingredients]

    recipeIngredientsCopy.splice(ingredientIndex, 1, {
      id: recipe_ingredient.id,
      recipe_id: recipe_ingredient.recipe_id,
      ingredient_id: value,
      uom_id: recipe_ingredient.uom_id,
      quantity: recipe_ingredient.quantity,
      section_id: recipe_ingredient.section_id,
    })

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: section.steps,
      recipe_ingredients: recipeIngredientsCopy,
    })

    // Update the parent state
    setSectionsMap(sectionsMapCopy)
  }

  const updateValueUOMId = (selectedOption) => {
    const value = selectedOption.id
    setUOMId(value)
    setUOM(selectedOption)

    //Replace section ingredients
    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array

    const recipeIngredientsCopy = [...section.recipe_ingredients]

    recipeIngredientsCopy.splice(ingredientIndex, 1, {
      id: recipe_ingredient.id,
      recipe_id: recipe_ingredient.recipe_id,
      ingredient_id: recipe_ingredient.ingredient_id,
      uom_id: value,
      quantity: recipe_ingredient.quantity,
      section_id: recipe_ingredient.section_id,
    })

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: section.steps,
      recipe_ingredients: recipeIngredientsCopy,
    })

    // Update the parent state
    setSectionsMap(sectionsMapCopy)
  }

  const updateValueQuantity = (e) => {
    const value = e.target.value
    setQuantity(value)

    //Replace section ingredients
    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array

    const recipeIngredientsCopy = [...section.recipe_ingredients]

    recipeIngredientsCopy.splice(ingredientIndex, 1, {
      id: recipe_ingredient.id,
      recipe_id: recipe_ingredient.recipe_id,
      ingredient_id: recipe_ingredient.ingredient_id,
      uom_id: recipe_ingredient.uom_id,
      quantity: value,
      section_id: recipe_ingredient.section_id,
    })

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: section.steps,
      recipe_ingredients: recipeIngredientsCopy,
    })

    // Update the parent state
    setSectionsMap(sectionsMapCopy)
  }

  return (
    <div className="recipe_ingredient">
      <label htmlFor="ingredient">Ingredient</label>
      <Select
        onChange={updateValueIngredientId}
        name="ingredient_id"
        value={ingredient}
        options={listIngredients}
        getOptionLabel={(option) => `${option.name}`}
        getOptionValue={(option) => `${option.id}`}
      ></Select>
      <label htmlFor="uom">UOM</label>
      <Select
        onChange={updateValueUOMId}
        name="uom_id"
        value={uom}
        options={listUoms}
        getOptionLabel={(option) => `${option.name}`}
        getOptionValue={(option) => `${option.id}`}
      ></Select>
      <label htmlFor="quantity">Quantity</label>
      <textarea
        type="text"
        name="quantity"
        value={quantity}
        id="quantity"
        className="form-control"
        required
        onChange={updateValueQuantity}
      />
    </div>
  )
}

RecipeIngredient.propTypes = {
  recipe_ingredient: PropTypes.object,
  section: PropTypes.object,
  sectionIndex: PropTypes.number,
  ingredientIndex: PropTypes.number,
  listIngredients: PropTypes.array,
  listUoms: PropTypes.array,
  sectionsMap: PropTypes.shape({
    k0: PropTypes.arrayOf(PropTypes.number),
    k1: PropTypes.arrayOf(PropTypes.string),
  }),
  setSectionsMap: PropTypes.func,
}

export default RecipeIngredient

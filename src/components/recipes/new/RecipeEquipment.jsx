import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const RecipeEquipment = (props) => {
  const recipe_equipment = props.recipe_equipment;
  const section = props.section;
  const sectionIndex = props.sectionIndex;
  const recipeEquipmentIndex = props.recipeEquipmentIndex;
  const setSectionsMap = props.setSectionsMap;
  const [equipmentId, setEquipmentId] = useState(
    recipe_equipment.equipment_id
  );
  const [quantity, setQuantity] = useState(recipe_equipment.quantity);
  const [uomId, setUOMId] = useState(recipe_equipment.uom_id);

  useEffect(() => {
    setEquipmentId(recipe_equipment.equipment_id);
    setQuantity(recipe_equipment.quantity);
    setUOMId(recipe_equipment.uom_id);
  }, [props.recipe_equipment])

  const updateValueEquipmentId = (e) => {
    const value = e.target.value;
    setEquipmentId(value);

    //Replace section equipments
    const sectionsMapCopy = new Map(props.sectionsMap); // Get a copy of the sections array

    const recipeEquipmentsCopy = [...section.recipe_equipments];

    recipeEquipmentsCopy.splice(recipeEquipmentIndex, 1, {
      id: recipe_equipment.id,
      recipe_id: recipe_equipment.recipe_id,
      equipment_id: value,
      quantity: recipe_equipment.quantity,
      uom_id: recipe_equipment.uom_id,
      section_id: recipe_equipment.section_id,
    });

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: section.steps,
      recipe_equipments: recipeEquipmentsCopy,
    });

    // Update the parent state
    setSectionsMap(sectionsMapCopy);
  };

  const updateValueUOMId = (e) => {
    const value = e.target.value;
    setUOMId(value);

    //Replace section equipments
    const sectionsMapCopy = new Map(props.sectionsMap); // Get a copy of the sections array

    const recipeEquipmentsCopy = [...section.recipe_equipments];

    recipeEquipmentsCopy.splice(recipeEquipmentIndex, 1, {
      id: recipe_equipment.id,
      recipe_id: recipe_equipment.recipe_id,
      equipment_id: recipe_equipment.equipment_id,
      quantity: recipe_equipment.quantity,
      uom_id: value,
      section_id: recipe_equipment.section_id,
    });

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: section.steps,
      recipe_equipments: recipeEquipmentsCopy,
    });

    // Update the parent state
    setSectionsMap(sectionsMapCopy);
  };

  const updateValueQuantity = (e) => {
    const value = e.target.value;
    setQuantity(value);

    //Replace section equipments
    const sectionsMapCopy = new Map(props.sectionsMap); // Get a copy of the sections array

    const recipeEquipmentsCopy = [...section.recipe_equipments];

    recipeEquipmentsCopy.splice(recipeEquipmentIndex, 1, {
      id: recipe_equipment.id,
      recipe_id: recipe_equipment.recipe_id,
      equipment_id: recipe_equipment.equipment_id,
      quantity: value,
      uom_id: recipe_equipment.uom_id,
      section_id: recipe_equipment.section_id,
    });

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: section.steps,
      recipe_equipments: recipeEquipmentsCopy,
    });

    // Update the parent state
    setSectionsMap(sectionsMapCopy);
  };

  return (
    <div className="recipe_equipment">
      <label htmlFor="equipment">Equipment</label>
      <input
        type="text"
        name="equipment_id"
        value={equipmentId}
        id="equipmentId"
        className="form-control"
        required
        onChange={updateValueEquipmentId}
      />
      <label htmlFor="uom">UOM</label>
      <textarea
        type="text"
        name="uom_id"
        value={uomId}
        id="uomId"
        className="form-control"
        required
        onChange={updateValueUOMId}
      />
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
  );
};

RecipeEquipment.propTypes = {
  recipe_equipment: PropTypes.object,
  section: PropTypes.object,
  sectionIndex: PropTypes.number,
  recipeEquipmentIndex: PropTypes.number,
  sectionsMap: PropTypes.shape({
    k0: PropTypes.arrayOf(PropTypes.number),
    k1: PropTypes.arrayOf(PropTypes.string),
  }),
  setSectionsMap: PropTypes.func,
};

export default RecipeEquipment;

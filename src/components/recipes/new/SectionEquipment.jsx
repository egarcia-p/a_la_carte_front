import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RecipeEquipment from './RecipeEquipment'

const SectionNameInput = (props) => {
  return (
    <input
      type="text"
      name="name"
      value={props.name}
      className="form-control"
      required
      onChange={props.updateName}
    />
  )
}

const SectionEquipment = (props) => {
  const section = props.section
  const sectionIndex = props.sectionIndex
  const setSectionsMap = props.setSectionsMap
  //const sections = props.sections;
  //const nameRef = useRef();
  const [name, setName] = useState(section.name)

  const DeleteEquipmentButton = (pr) => {
    const handleClick = () => {
      pr.onButtonClick(pr.equipmentIndex)
    }
    return <button onClick={handleClick}>Delete Equipment</button>
  }

  /*Event Handlers */
  const AddEquipmentButton = () => {
    return <button onClick={onNewEquipmentClick}>Add a new equipments</button>
  }

  function onNewEquipmentClick() {
    const newEquipment = {
      recipe_id: section.recipe_id,
      equipment_id: '',
      quantity: 1,
      uom_id: '',
      section_id: section.id,
    }

    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array

    const newSection = {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      recipe_equipments: [...section.recipe_equipments, newEquipment],
    }
    sectionsMapCopy.set(sectionIndex, newSection)

    setSectionsMap(sectionsMapCopy)
  }

  const updateName = (e) => {
    const value = e.target.value
    setName(value)

    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array
    // Replace the current section item
    const newSection = {
      id: section.id,
      name: value,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      recipe_equipments: section.recipe_equipments,
    }

    sectionsMapCopy.set(sectionIndex, newSection)

    // Update the parent state
    setSectionsMap(sectionsMapCopy)
  }

  console.log(section) //TODO remove logs

  function onEquipmentDeleteClick(equipmentIndex) {
    //todo get index
    const index = equipmentIndex
    console.log(`Index: ${index}`)

    const newEquipments = [...section.recipe_equipments]
    newEquipments.splice(index, 1)
    console.log(newEquipments)

    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array

    const newSection = {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      recipe_equipments: newEquipments,
    }
    sectionsMapCopy.set(sectionIndex, newSection)

    setSectionsMap(sectionsMapCopy)
  }

  return (
    <div className="section">
      <h2>Section Id: {section.id}</h2>
      <h1>
        Section Name: <SectionNameInput name={name} updateName={updateName} />
      </h1>

      <AddEquipmentButton />
      <div className="ingredients">
        {section.recipe_equipments.map((recipe_equipment, index) => (
          <div key={index} className="recipe_equipment">
            <RecipeEquipment
              key={index}
              recipe_equipment={recipe_equipment}
              section={section}
              sectionIndex={sectionIndex}
              recipeEquipmentIndex={index}
              sectionsMap={props.sectionsMap}
              setSectionsMap={setSectionsMap}
            ></RecipeEquipment>
            <DeleteEquipmentButton
              onButtonClick={onEquipmentDeleteClick}
              equipmentIndex={index}
            ></DeleteEquipmentButton>
          </div>
        ))}
      </div>
    </div>
  )
}

SectionEquipment.propTypes = {
  section: PropTypes.object,
  sectionIndex: PropTypes.number,
  sectionsMap: PropTypes.shape({
    k0: PropTypes.arrayOf(PropTypes.number),
    k1: PropTypes.arrayOf(PropTypes.string),
  }),
  setSectionsMap: PropTypes.func,
}

SectionNameInput.propTypes = {
  name: PropTypes.string,
  updateName: PropTypes.func,
}

export default SectionEquipment

import React from 'react'
import PropTypes from 'prop-types'

const Equipments = (props) => {
  const sections = props.sections
  //console.log(sections)
  return (
    <div>
      {sections.map((section, i) => (
        <Section key={i} section={section}></Section>
      ))}
    </div>
  )
}

const Section = (props) => {
  const section = props.section

  if (section.recipe_equipments.length > 0) {
    return (
      <div>
        <h3>{section.name}</h3>
        {section.recipe_equipments.map((recipe_equipment, i) => (
          <RecipeEquipment
            key={i}
            recipe_equipment={recipe_equipment}
          ></RecipeEquipment>
        ))}
      </div>
    )
  } else {
    return <div></div>
  }
}

const RecipeEquipment = (props) => {
  const recipeEquipment = props.recipe_equipment

  return (
    <div>
      {recipeEquipment.quantity} {recipeEquipment.uom_name} -{' '}
      {recipeEquipment.name}
    </div>
  )
}

Equipments.propTypes = {
  sections: PropTypes.array,
}

Section.propTypes = {
  section: PropTypes.object,
}

RecipeEquipment.propTypes = {
  recipe_equipment: PropTypes.object,
}

export default Equipments

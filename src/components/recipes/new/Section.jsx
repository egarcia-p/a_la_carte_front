import React, { useState } from 'react'
//import Step from "./Step";
import PropTypes from 'prop-types'
import Step from './Step'

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

const Section = (props) => {
  const section = props.section
  const sectionIndex = props.sectionIndex
  const setSectionsMap = props.setSectionsMap
  //const section = new Map(sectionsMap).get(sectionIndex);
  //const sections = props.sections;
  //const nameRef = useRef();
  const [name, setName] = useState(section.name)

  /*Event Handlers */
  const AddStepButton = () => {
    return <button onClick={onNewStepClick}>Add a new step</button>
  }

  const DeleteStepButton = (pr) => {
    const handleClick = () => {
      pr.onButtonClick(pr.stepIndex)
    }
    return <button onClick={handleClick}>Delete Step</button>
  }

  function onNewStepClick() {
    const newStep = {
      description: 'Fill Description',
      step_number: section.steps.length + 1,
      recipe_id: section.recipe_id,
    }

    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array

    const newSection = {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: [...section.steps, newStep],
    }
    sectionsMapCopy.set(sectionIndex, newSection)

    setSectionsMap(sectionsMapCopy)
  }

  function onStepDeleteClick(stepIndex) {
    //todo get index
    const index = stepIndex
    console.log(`Index: ${index}`)

    const newSteps = [...section.steps]
    newSteps.splice(index, 1)
    console.log(newSteps)

    const sectionsMapCopy = new Map(props.sectionsMap) // Get a copy of the sections array

    const newSection = {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: newSteps,
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
      steps: section.steps,
    }

    sectionsMapCopy.set(sectionIndex, newSection)

    // Update the parent state
    setSectionsMap(sectionsMapCopy)
  }

  console.log(section)

  return (
    <div className="section">
      <h2>Section Id: {section.id}</h2>
      <h1>
        Section Name: <SectionNameInput name={name} updateName={updateName} />
      </h1>

      <AddStepButton />
      <div className="steps">
        {section.steps.map((step, index) => (
          <div key={index} className="step">
            <Step
              key={index}
              step={step}
              section={section}
              sectionIndex={sectionIndex}
              stepIndex={index}
              sectionsMap={props.sectionsMap}
              setSectionsMap={setSectionsMap}
            ></Step>
            <DeleteStepButton
              onButtonClick={onStepDeleteClick}
              stepIndex={index}
            ></DeleteStepButton>
          </div>
        ))}
      </div>
    </div>
  )
}

Section.propTypes = {
  section: PropTypes.object,
  sectionIndex: PropTypes.number,
  sectionsMap: PropTypes.shape({
    k0: PropTypes.arrayOf(PropTypes.number),
    k1: PropTypes.arrayOf(PropTypes.string),
  }),
  setSectionsMap: PropTypes.func,
  stepIndex: PropTypes.number,
}

SectionNameInput.propTypes = {
  name: PropTypes.string,
  updateName: PropTypes.func,
}

export default Section

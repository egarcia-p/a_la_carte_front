import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Step = (props) => {
  const step = props.step;
  const section = props.section;
  const sectionIndex = props.sectionIndex;
  const stepIndex = props.stepIndex;
  const setSectionsMap = props.setSectionsMap;
  const [stepNumber, setStepNumber] = useState(step.step_number);
  const [description, setDescription] = useState(step.description);

  useEffect(() => {
    setStepNumber(step.step_number);
    setDescription(step.description);
  }, [props.step])

  const updateValueStepNumber = (e) => {
    const value = e.target.value;
    setStepNumber(value);

    //Replace section steps
    const sectionsMapCopy = new Map(props.sectionsMap); // Get a copy of the sections array

    const stepsCopy = [...section.steps];

    stepsCopy.splice(stepIndex, 1, {
      id: step.id,
      recipe_id: step.recipe_id,
      section_id: step.section_id,
      step_number: value,
      description: step.description,
    });

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: stepsCopy,
    });

    // Update the parent state
    setSectionsMap(sectionsMapCopy);
  };

  const updateValueDescription = (e) => {
    const value = e.target.value;
    setDescription(value);

    //Replace section steps
    const sectionsMapCopy = new Map(props.sectionsMap); // Get a copy of the sections map

    const stepsCopy = [...section.steps];

    stepsCopy.splice(stepIndex, 1, {
      id: step.id,
      recipe_id: step.recipe_id,
      section_id: step.section_id,
      step_number: step.step_number,
      description: value,
    });

    // Replace the current section item
    sectionsMapCopy.set(sectionIndex, {
      id: section.id,
      name: section.name,
      recipe_id: section.recipe_id,
      sort_number: section.sort_number,
      steps: stepsCopy,
    });

    // Update the parent state
    setSectionsMap(sectionsMapCopy);
  };

  return (
    <div className="step">
      <label htmlFor="stepNumber">Step #</label>
      <input
        type="text"
        name="step_number"
        value={stepNumber}
        id="stepNumber"
        className="form-control"
        required
        onChange={updateValueStepNumber}
      />
      <label htmlFor="stepDescription">Description</label>
      <textarea
        type="text"
        name="description"
        value={description}
        id="stepDescription"
        className="form-control"
        required
        onChange={updateValueDescription}
      />
    </div>
  );
};

Step.propTypes = {
  step: PropTypes.object,
  section: PropTypes.object,
  sectionIndex: PropTypes.number,
  stepIndex: PropTypes.number,
  sectionsMap: PropTypes.shape({
    k0: PropTypes.arrayOf(PropTypes.number),
    k1: PropTypes.arrayOf(PropTypes.string)
  }),
  setSectionsMap: PropTypes.func,
};

export default Step;

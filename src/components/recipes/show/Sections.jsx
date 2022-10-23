import React from 'react'
import PropTypes from 'prop-types'

const Sections = (props) => {
  const sections = props.sections //TODO check if needed to declare as map
  console.log(sections)
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

  if (section.steps.length > 0) {
    return (
      <div>
        <h3>{section.name}</h3>
        {section.steps.map((step, i) => (
          <Step key={i} step={step}></Step>
        ))}
      </div>
    )
  } else {
    return <div></div>
  }
}

const Step = (props) => {
  const step = props.step

  // console.log(step)

  return (
    <div>
      {step.step_number}: {step.description}
    </div>
  )
}

Sections.propTypes = {
  sections: PropTypes.array,
}

Section.propTypes = {
  section: PropTypes.object,
}

Step.propTypes = {
  step: PropTypes.object,
}

export default Sections

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Section from './Section'

// stripHtmlEntities(str) {
//   return String(str).replace(/</g, "&lt;").replace(/>/g, "&gt;");
// }

// onChange(event) {
//   this.setState({ [event.target.name]: event.target.value });
// }

function RecipeSteps() {
  let params = useParams();
  const navigate = useNavigate();
  const [sectionsMap, setSectionsMap] = useState(new Map()
    //Example of json state for sections
    // {
    //   index: 1,
    //   id: 1,
    //   name: "Section Test 1",
    //   steps: [{ description: "Desc step 1", step_number: 1 }],
    // },
    // {
    //   index: 2,
    //   id: 2,
    //   name: "Section Test 1",
    //   steps: [],
    // },
  );

  useEffect(() => {
    Promise.all([
      // fetch(`/api/v1/recipe/edit/${props.recipe_id}`),
      fetch(`/api/v1/sections/find_by_recipe_id/${params.id}`),
    ])
      .then(([res1]) => {
        return Promise.all([res1.json()]);
      })
      .then(([res1]) => {
        const newMap = new Map();
        Array.from(res1).map((row, index) => newMap.set(index, row))
        setSectionsMap(newMap);
      });
  }, []);

  /*Event Handlers */
  const AddSectionButton = () => {
    return <button onClick={onNewSectionClick}>Add a new section</button>;
  };

  function onNewSectionClick() {
    const key = sectionsMap.size;// is this a good key? or can we get last and add 1? in case of deletions
    const newSection = {
      name: "Insert Name",
      recipe_id: params.id,
      sort_number: 1,
      steps: [],
    };
    const newMap = new Map(sectionsMap)
    newMap.set(key,newSection)
    setSectionsMap(newMap);
  }

  function onSubmit(e) {
    e.preventDefault();
    

    var target = { targetrecord: Array.from(sectionsMap.values()) };
    console.log({
      target,
    });

    const url = `/api/v1/sections/save_multiple`;

    const token = `$('meta[name="csrf-token"]').attr('content')`;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(target),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => {
        navigate(`/recipe/${params.id}`);
      })
      .catch((error) => console.log(error.message));
  }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add Sections and Steps for Recipe: {params.id}
          </h1>
          <AddSectionButton />
          <form onSubmit={onSubmit}>
            {Array.from(sectionsMap.values()).map((section,i) => (
              <Section
                key={i}
                section={section}
                sectionIndex={i}
                sectionsMap={sectionsMap}
                setSectionsMap={setSectionsMap}
              ></Section>
            ))}

            <button type="submit">Save form</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecipeSteps;

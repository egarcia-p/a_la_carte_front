import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionIngredient from "./SectionIngredient";

function RecipeIngredients() {
  let params = useParams();
  const navigate = useNavigate();
  const [listIngredients, setListIngredients] = useState([]);
  const [listUoms, setListUoms] = useState([]);
  const [sectionsMap, setSectionsMap] = useState(
    new Map() //structure of JSON
    //Example of json state for sections
    // {
    //   index: 1,
    //   id: 1,
    //   name: "Section Test 1",
    //   ingredients: [{ingredient_id: #, uom_id: #, quantity: #}]
    //   steps: [{ description: "Desc step 1", step_number: 1 }],
    // },
    // {
    //   index: 2,
    //   id: 2,
    //   name: "Section Test 1",
    //   ingredients: [{ingredient_id: #, uom_id: #, quantity: #}]
    // },
  );

  useEffect(() => {
    //API setup for ingredients
    Promise.all([
      fetch(`/api/v1/sections/find_by_recipe_id/${params.id}`),
      fetch("/api/v1/ingredients/index"),
      fetch("/api/v1/uoms/index"),
    ])
      .then(([res1, res2, res3]) => {
        return Promise.all([res1.json(), res2.json(), res3.json()]);
      })
      .then(([res1, res2, res3]) => {
        const newMap = new Map();
        Array.from(res1).map((row, index) => newMap.set(index, row));
        setSectionsMap(newMap);
        setListIngredients(res2);
        setListUoms(res3);
      });
  }, []);

  /*Event Handlers */
  const AddSectionButton = () => {
    return <button onClick={onNewSectionClick}>Add a new section</button>;
  };

  function onNewSectionClick() {
    const key = sectionsMap.size; // is this a good key? or can we get last and add 1? in case of deletions
    const newSection = {
      name: "Insert Name",
      recipe_id: params.id,
      sort_number: 1,
      recipe_ingredients: [],
    };
    const newMap = new Map(sectionsMap);
    newMap.set(key, newSection);
    setSectionsMap(newMap);
  }

  function onSubmit(e) {
    // TODO adjust for ingredients
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

  if (listIngredients.length > 0 && listUoms.length > 0) {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add Sections and Ingredients for Recipe: {params.id}
            </h1>
            <AddSectionButton />
            <form onSubmit={onSubmit}>
              {Array.from(sectionsMap.values()).map((section, i) => (
                <SectionIngredient
                  key={i}
                  section={section}
                  sectionIndex={i}
                  sectionsMap={sectionsMap}
                  setSectionsMap={setSectionsMap}
                  listIngredients={listIngredients}
                  listUoms={listUoms}
                ></SectionIngredient>
              ))}

              <button type="submit">Save form</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default RecipeIngredients;

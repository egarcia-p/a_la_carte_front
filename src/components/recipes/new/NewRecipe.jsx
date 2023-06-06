
import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { createProtectedResource } from '../../../services/recipes.service'
import { getProtectedResource } from '../../../services/categories.service'
//TODO GET SUBCATEGORIES resource
import { access } from 'fs'



export default function  NewRecipe() {
  const {register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  
  const { getAccessTokenSilently } = useAuth0();

  const getCategoriesAndSubcategories = async (id) => {
    const accessToken = await getAccessTokenSilently();
    //TODO get categories and subcategories resource
    const { categoriesData, errorCategories } = await getProtectedResource(accessToken);
    const { subcategoriesData, errorSubcategories } = await (accessToken);

    if(categoriesData && subcategoriesData){
      setCategories(categoriesData);
      setSubcategories(subcategoriesData);
    }

    if(errorCategories || errorSubcategories){
      setCategories(JSON.stringify(errorCategories, null, 2));
      setSubcategories(JSON.stringify(errorSubcategories, null, 2))
    }
  }

  useEffect(() => {
    let isMounted = true;

    const getInitialInfo = async () => {
      //GET categories and subcategories
      getCategoriesAndSubcategories();

      if (!isMounted) {
        return;
      }
    }

    getInitialInfo();
    return () => {
      isMounted = false;
    }
  }, [getAccessTokenSilently])

  const onFormSubmit   = async (data) => {
    const token = await getAccessTokenSilently();

    const {response, error} = createProtectedResource(token, data);

    if (!error) {
      navigate('/recipes');
    }
  }

  const onErrors = (errors) => console.log(errors);



  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new recipe to our awesome recipe collection.
          </h1>
        </div>
      </div>
    </div>
  )
}


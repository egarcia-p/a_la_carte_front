import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createProtectedResource } from '../../services/categories.service'
import { useForm } from "react-hook-form";


export default function NewCategory() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();


  const onFormSubmit = async (data) => {
    const name = data.name;
    if (name.length == 0) return

    const accessToken = await getAccessTokenSilently();

    const {response, error} = createProtectedResource(accessToken, JSON.stringify(data));

    if(!error){
    navigate("/categories");
    }
  }

  const onErrors = errors => console.error(errors);


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">Add a new category</h1>
          <form onSubmit={handleSubmit(onFormSubmit,onErrors)}>
            <div className="form-group">
              <label htmlFor="categoryName">Name</label>
              <input
                type="text"
                name="name"
                id="categoryName"
                className="form-control"
                placeholder="Enter category name"
                {...register('name')}
              />
            </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Category
              </button>
              <Link to="/categories" className="btn btn-link mt-3">
                Back to categories
              </Link>
            </form>
          </div>
        </div>
      </div>
           )
}

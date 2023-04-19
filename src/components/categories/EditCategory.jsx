import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCategoryResource, updateProtectedResource } from '../../services/categories.service';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';


export default function EditCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const {id} = useParams();
  const {register, handleSubmit, setValue} = useForm();

  const {getAccessTokenSilently} = useAuth0();

  const getCategory = async (id) => {
    const token = await getAccessTokenSilently();
    const {data, error} = await getCategoryResource(token,id);

    if (data) {
      setCategory(data);
      setValue('name', data.name);
    }

    if (error) {
      setCategory(error); //TODO error handling
    }
  }

  useEffect(() => {
    let isMounted = true;

    const getCategoryInt = async () => {
      getCategory(id);

      if (!isMounted) {
        return;
      }

    };

    getCategoryInt();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);
  
  const onFormSubmit = async (data) => {
    const name = data.name;
    data.id = id;
    if (name.length == 0) return

    const accessToken = await getAccessTokenSilently();

    const {response, error} = updateProtectedResource(accessToken, data);

    if(!error){
    navigate("/categories");
    }
  }

  const onErrors = errors => console.error(errors);


  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit a category: {category.id}
          </h1>
          <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
            <div className="form-group">
              <label htmlFor="categoryName">Name</label>
              <input
                type="text"
                name="name"
                id="categoryName"
                className="form-control"
                rules={{ required: true }}
                {...register('name')}
              />
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Edit Category
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

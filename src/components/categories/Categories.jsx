import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProtectedResource, getProtectedResource } from '../../services/categories.service';

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [refreshData, setRefreshData] = useState();

  const { getAccessTokenSilently } = useAuth0();

  const getCategories = async () => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await getProtectedResource(accessToken);

    if (data) {
      setCategories(data);
    }

    if (error) {
      setCategories(JSON.stringify(error, null, 2));
    }
  };

  useEffect(() => {
    let isMounted = true;


    const getCategoriesInt = async () => {
      getCategories();

      if (!isMounted) {
        return;
      }

    };

    getCategoriesInt();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const deleteCategoryFunc = async (id) => {
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await deleteProtectedResource(accessToken,id);


    if (data) {
      setRefreshData(!refreshData)
      return data;
    }

    if (error) {
      return error
    }
  };

  useEffect(() => {
    //TODO a better way to handle multiple requeswt for refresh, since now it calls 4 times
    getCategories();
  }, [refreshData]
  )

  function getAllCategories(categories) {
    console.log(categories)
    return(
    categories.map((category, index) => (
      <tr key={index}>
        <th scope="row">{category.id}</th>
        <td>{category.name}</td>
        <td>
          <button type="button" className="btn btn-warning">
            <Link to={`/category/${category.id}`}>Edit Category</Link>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteCategoryFunc(category.id)}
          >
            Delete Category
          </button>
        </td>
      </tr>
        ))
        )
  } 
  const noCategory = (
    <td colspan="5">
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No categories yet. <Link to="/category">create one</Link>
        </h4>
      </div>
    </td>
  )

  return (
    <>
      <div className="container py-3 align-items-center">
        <h1 className="display-4 text-center">Categories</h1>
      </div>
      <div className="py-3">
        <main className="container">
          <div className="row">
            <div className="text-right mb-3 col">
              <Link to="/category" className="btn custom-button">
                Create New Category
              </Link>
            </div>
            <div className="text-end mb-3 col-6">
              <Link to="/" className="btn btn-link">
                Home
              </Link>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? getAllCategories(categories) : noCategory}
            </tbody>
          </table>
        </main>
      </div>
    </>
  )
}

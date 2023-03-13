import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteProtectedResource, getProtectedResource } from '../../services/categories.service';

export default function Categories() {
  const [categories, setCategories] = useState([])

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    let isMounted = true;


    const getCategories = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await getProtectedResource(accessToken);

      if (!isMounted) {
        return;
      }

      if (data) {
        setCategories(data);
      }

      if (error) {
        setCategories(JSON.stringify(error, null, 2));
      }
    };

    getCategories();

    return () => {
      isMounted = false;
    };
  }, [getAccessTokenSilently]);

  const deleteCategory = (id) => {
    const deleteCategoryFunc = async () => {
      const accessToken = await getAccessTokenSilently();
      const { data, error } = await deleteProtectedResource(accessToken,id);


      if (data) {
        setCategories(data);
      }

      if (error) {
        setCategories(JSON.stringify(error, null, 2));
      }
    };
    deleteCategoryFunc();

    //TBD DELETE process
   /*  if (data.ok) {
      return response.json()
    }     
    throw new Error('Network response was not ok.') */

  }

  const allCategories = categories.map((category, index) => (
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
          onClick={() => this.deleteCategory(category.id)}
        >
          Delete Category
        </button>
      </td>
    </tr>
  ))
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
              {categories.length > 0 ? allCategories : noCategory}
            </tbody>
          </table>
        </main>
      </div>
    </>
  )
}

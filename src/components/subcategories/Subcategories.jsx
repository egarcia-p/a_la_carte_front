import { useAuth0 } from '@auth0/auth0-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteProtectedResource,
  getAllSubcategoriesResource,
} from '../../services/subcategories.service'
import { getProtectedResource } from '../../services/categories.service'

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState([])
  const [categories, setCategories] = useState([])
  const [refreshData, setRefreshData] = useState()

  const { getAccessTokenSilently } = useAuth0()

  const getSubcategories = async () => {
    const accessToken = await getAccessTokenSilently()
    const { data, error } = await getAllSubcategoriesResource(accessToken)

    if (data) {
      setSubcategories(data)
    }

    if (error) {
      setSubcategories(JSON.stringify(error, null, 2))
    }
  }

  const getCategories = async () => {
    const accessToken = await getAccessTokenSilently()
    const { data, error } = await getProtectedResource(accessToken)

    if (data) {
      setCategories(data)
    }

    if (error) {
      setCategories(JSON.stringify(error, null, 2))
    }
  }

  useEffect(() => {
    let isMounted = true

    const getSubcategoriesInt = async () => {
      getSubcategories()
      getCategories()

      if (!isMounted) {
        return
      }
    }

    getSubcategoriesInt()

    return () => {
      isMounted = false
    }
  }, [getAccessTokenSilently])

  const deleteSubcategory = (id) => {
    const deleteSubcategoryFunc = async () => {
      const accessToken = await getAccessTokenSilently()
      const { data, error } = await deleteProtectedResource(accessToken, id)

      if (data) {
        setSubcategories(data)
        setRefreshData(!refreshData)
      }

      if (error) {
        setSubcategories(JSON.stringify(error, null, 2))
      }
    }
    deleteSubcategoryFunc()
  }

  useEffect(() => {
    //TODO a better way to handle multiple requeswt for refresh, since now it calls 4 times
    getSubcategories()
    getCategories()
  }, [refreshData])

  function getAllSubCategories(subcategories) {
    //TODO FIX refresh multiple times this function according to logs
    return subcategories.map((subcategory, index) => (
      <tr key={index}>
        <th scope="row">{subcategory.id}</th>
        <td>{subcategory.name}</td>
        <td>
          {
            categories.find(
              (category) => category.id === subcategory.category_id
            ).name
          }
        </td>
        <td>
          <button type="button" className="btn btn-warning">
            <Link to={`/subcategory/${subcategory.id}`}>Edit Subcategory</Link>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.deleteSubcategory(subcategory.id)}
          >
            Delete Subcategory
          </button>
        </td>
      </tr>
    ))
  }

  const noSubcategory = (
    <td colspan="5">
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No subcategories yet. <Link to="/subcategory">create one</Link>
        </h4>
      </div>
    </td>
  )

  return (
    <>
      <div className="container py-3 align-items-center">
        <h1 className="display-4 text-center">Subcategories</h1>
      </div>
      <div className="py-3">
        <main className="container">
          <div className="row">
            <div className="text-right mb-3 col">
              <Link to="/subcategory" className="btn custom-button">
                Create New Subcategory
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
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.length > 0
                ? getAllSubCategories(subcategories)
                : noSubcategory}
            </tbody>
          </table>
        </main>
      </div>
    </>
  )
}

import React from "react";
import { Link } from "react-router-dom";

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    const url = "/api/v1/categories/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ categories: response }))
      .catch(() => this.props.history.push("/"));
  }

  deleteCategory(id) {
    const { history } = this.props;
    const url = `/api/v1/categories/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => this.componentDidMount())
      .catch((error) => console.log(error.message));
  }

  render() {
    const { categories } = this.state;
    const allCategories = categories.map((category, index) => (
      <tr key={index}>
        <th scope="row">{category.id}</th>
        <td>{category.name}</td>
        <td>
          <button
            type="button"
            className="btn btn-warning"
          >
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
    ));
    const noCategory = (
      <td colspan="5">
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            No categories yet. <Link to="/category">create one</Link>
          </h4>
        </div>
      </td>
    );

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
              <tbody>{categories.length > 0 ? allCategories : noCategory}</tbody>
            </table>
          </main>
        </div>
      </>
    );
  }
}
export default Categories;

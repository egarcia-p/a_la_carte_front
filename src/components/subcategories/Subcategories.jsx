import React from "react";
import { Link } from "react-router-dom";

class Subcategories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      subcategories: [],
    };
  }

  componentDidMount() {
    Promise.all([
      fetch("/api/v1/categories/index"),
      fetch("/api/v1/subcategories/index"),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        this.setState({
          categories: res1,
          subcategories: res2,
        });
      });
  }

  deleteSubcategory(id) {
    const { history } = this.props;
    const url = `/api/v1/subcategories/destroy/${id}`;
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

    const { subcategories, categories } = this.state;

    const allSubcategories = subcategories.map((subcategory, index) => (
      <tr key={index}>
        <th scope="row">{subcategory.id}</th>
        <td>{subcategory.name}</td>
        <td>{categories.find(category => category.id === subcategory.category_id).name}</td>
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
    ));
    const noSubcategory = (
      <td colspan="5">
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            No subcategories yet. <Link to="/subcategory">create one</Link>
          </h4>
        </div>
      </td>
    );

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
                {subcategories.length > 0 ? allSubcategories : noSubcategory}
              </tbody>
            </table>
          </main>
        </div>
      </>
    );
  }
}
export default Subcategories;

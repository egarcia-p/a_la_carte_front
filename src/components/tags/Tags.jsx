import React from "react";
import { Link } from "react-router-dom";

class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  componentDidMount() {
    const url = "/api/v1/tags/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ tags: response }))
      .catch(() => this.props.history.push("/"));
  }

  deleteTag(id) {
    const { history } = this.props;
    const url = `/api/v1/tags/destroy/${id}`;
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

  setColor(tag) {
    return tag.color;
  }

  render() {
    const { tags } = this.state;
    const allTags = tags.map((tag, index) => (
      <tr key={index}>
        <th scope="row">{tag.id}</th>
        <td>{tag.name}</td>
        <td>{tag.color}</td>
        <td>
          <label
            className="btn"
            style={{
              color: this.setColor(tag),
              borderColor: this.setColor(tag),
            }}
          >
            Example
          </label>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-warning"
          >
            <Link to={`/tag/${tag.id}`}>Edit Tag</Link>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.deleteTag(tag.id)}
          >
            Delete Tag
          </button>
        </td>
      </tr>
    ));
    const noTag = (
      <td colspan="5">
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            No tags yet. <Link to="/tag">create one</Link>
          </h4>
        </div>
      </td>
    );

    return (
      <>
        <div className="container py-3 align-items-center">
          <h1 className="display-4 text-center">Tags</h1>
        </div>
        <div className="py-3">
          <main className="container">
            <div className="row">
              <div className="text-right mb-3 col">
                <Link to="/tag" className="btn custom-button">
                  Create New Tag
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
                  <th scope="col">Color</th>
                  <th scope="col">Example</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>{tags.length > 0 ? allTags : noTag}</tbody>
            </table>
          </main>
        </div>
      </>
    );
  }
}
export default Tags;

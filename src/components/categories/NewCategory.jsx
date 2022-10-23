import React from 'react'
import { Link } from 'react-router-dom'

class NewCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    const url = '/api/v1/categories/create'
    const { name } = this.state

    if (name.length == 0) return

    const body = {
      name,
    }

    const token = document.querySelector('meta[name="csrf-token"]').content
    fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((response) => this.props.history.push('/categories'))
      .catch((error) => console.log(error.message)) //maybe add error messages
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add a new category</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="categoryName">Name</label>
                <input
                  type="text"
                  name="name"
                  id="categoryName"
                  className="form-control"
                  required
                  onChange={this.onChange}
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
}

export default NewCategory

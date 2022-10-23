import React from 'react'
import { Link } from 'react-router-dom'

class NewSubcategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      categories: [],
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  componentDidMount() {
    const url = `/api/v1/categories/index`
    fetch(url)
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((response) => this.setState({ categories: response }))
      .catch((error) => console.log(error.message))
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    const url = '/api/v1/subcategories/create'
    const { name, category_id } = this.state

    if (name.length == 0) return

    const body = {
      name,
      category_id,
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
      .then((response) => this.props.history.push('/subcategories'))
      .catch((error) => console.log(error.message)) //maybe add error messages
  }

  render() {
    const { categories } = this.state
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">Add a new subcategory</h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="subcategoryName">Name</label>
                <input
                  type="text"
                  name="name"
                  id="subcategoryName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subcategoryCategoryId">Category</label>
                <select
                  id="subcategoryCategoryId"
                  name="category_id"
                  onChange={this.onChange}
                  required
                  className="form-select form-select-lg mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option id="blank">Open this select menu</option>
                  {categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Subcategory
              </button>
              <Link to="/subcategories" className="btn btn-link mt-3">
                Back to subcategories
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default NewSubcategory

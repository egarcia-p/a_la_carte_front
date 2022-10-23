import React from 'react'
import { Link } from 'react-router-dom'

class EditCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      category: {},
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  componentDidMount() {
    const url = `/api/v1/categories/edit/${this.props.match.params.id}`
    console.log(url)
    fetch(url)
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((response) => this.setState({ category: response }))
      .catch(() => console.log('error'))
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit(event) {
    event.preventDefault()
    const url = `/api/v1/categories/update/${this.props.match.params.id}`
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
      .catch((error) => console.log(error.message))
  }

  render() {
    const { category } = this.state
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Edit a category: {category.id}
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="categoryName">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={category.name}
                  id="categoryName"
                  className="form-control"
                  required
                  onChange={this.onChange}
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
}

export default EditCategory

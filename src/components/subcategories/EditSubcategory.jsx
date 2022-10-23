import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

class EditSubcategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      category_id: '',
      category: {},
      subcategory: {},
      categories: [],
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/v1/categories/index'),
      fetch(`/api/v1/subcategories/edit/${this.props.match.params.id}`),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()])
      })
      .then(([res1, res2]) => {
        this.setState({
          categories: res1,
          subcategory: res2,
          category: res1.find((category) => category.id === res2.category_id),
          name: res2.name,
          category_id: res2.category_id,
        })
      })
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleChange = (selectedOption) => {
    console.log('selected: ' + selectedOption)
    this.setState({ category_id: selectedOption.id, category: selectedOption })
  }

  onSubmit(event) {
    event.preventDefault()
    const url = `/api/v1/subcategories/update/${this.props.match.params.id}`
    const { name, category_id } = this.state

    if (name.length == 0 || category_id == 0) return

    const body = {
      name,
      category_id,
    }
    console.log(body)

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
      .catch((error) => console.log(error.message))
  }

  render() {
    const { subcategory, categories, category_id, category } = this.state
    console.log(category_id)
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Edit a subcategory: {subcategory.id}
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="subcategoryName">Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={subcategory.name}
                  id="subcategoryName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subcategoryCategoryId">Category</label>
                <Select
                  onChange={this.handleChange}
                  value={category}
                  options={categories}
                  getOptionLabel={(option) => `${option.name}`}
                  getOptionValue={(option) => `${option.id}`}
                ></Select>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Edit Subcategory
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

export default EditSubcategory

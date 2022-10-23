import React from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select'

class NewRecipe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      subtitle: '',
      servings: '',
      total_time: '',
      author: '',
      category_id: '',
      subcategory_id: '',
      categories: [],
      category: { id: 'blank', name: 'Select a Category' },
      subcategories: [],
      subcategory: { id: 'blank', name: 'Select a Subcategory if applies' },
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this)
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/v1/categories/index'),
      fetch('/api/v1/subcategories/index'),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()])
      })
      .then(([res1, res2]) => {
        this.setState({
          categories: res1,
          subcategories: res2,
        })
      })
  }

  stripHtmlEntities(str) {
    return String(str).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSelectChangeCategory = (selectedOption) => {
    console.log('selected: ' + selectedOption.name)
    this.setState({ category_id: selectedOption.id })
    this.setState({ category: selectedOption })
  }

  handleSelectChangeSubcategory = (selectedOption) => {
    console.log('selected: ' + selectedOption.name)
    this.setState({ subcategory_id: selectedOption.id })
    this.setState({ subcategory: selectedOption })
  }

  onSubmit(event) {
    event.preventDefault()
    const url = '/api/v1/recipes/create'
    const {
      title,
      subtitle,
      servings,
      total_time,
      author,
      category_id,
      subcategory_id,
    } = this.state

    if (
      title.length == 0 ||
      subtitle.length == 0 ||
      servings.length == 0 ||
      total_time.length == 0 ||
      author.length == 0 ||
      category_id.length == 0 ||
      subcategory_id.length == 0
    )
      return

    const body = {
      title,
      subtitle,
      // instruction: instruction.replace(/\n/g, "<br> <br>"),
      servings,
      total_time,
      author,
      category_id,
      subcategory_id,
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
      .then((response) => this.props.history.push(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message))
  }

  render() {
    const { categories, subcategories, category, subcategory } = this.state
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new recipe to our awesome recipe collection.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="recipeTitle">Title</label>
                <input
                  type="text"
                  name="title"
                  id="recipeTitle"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeSubtitle">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  id="recipeSubtitle"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
                <small id="subtitleHelp" className="form-text text-muted">
                  Subtitle is optional in support of the title of the recipe.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="recipeServings">Servings</label>
                <input
                  type="text"
                  name="servings"
                  id="recipeServings"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeTotalTime">Total Time</label>
                <input
                  type="text"
                  name="total_time"
                  id="recipeTotalTime"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeAuthor">Author</label>
                <input
                  type="text"
                  name="author"
                  id="recipeAuthor"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeCategory">Category</label>
                <Select
                  onChange={this.handleSelectChangeCategory}
                  name="category_id"
                  value={category}
                  options={categories}
                  getOptionLabel={(option) => `${option.name}`}
                  getOptionValue={(option) => `${option.id}`}
                ></Select>
              </div>
              <div className="form-group">
                <label htmlFor="recipeSubcategory">Subcategory</label>
                <Select
                  name="subcategory_id"
                  onChange={this.handleSelectChangeSubcategory}
                  value={subcategory}
                  options={subcategories}
                  getOptionLabel={(option) => `${option.name}`}
                  getOptionValue={(option) => `${option.id}`}
                ></Select>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Recipe
              </button>
              <Link to="/recipes" className="btn btn-link mt-3">
                Back to recipes
              </Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default NewRecipe

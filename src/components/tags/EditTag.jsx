import React from 'react'
import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'

export default class EditTag extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tag: {},
    }
  }
  componentDidMount() {
    const url = `/api/v1/tags/edit/${this.props.match.params.id}`
    console.log(url)
    fetch(url)
      .then((response) => {
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        throw new Error('Network response was not ok.')
      })
      .then((response) => this.setState({ tag: response }))
      .catch(() => console.log('error'))
  }

  render() {
    const { tag } = this.state
    const { history } = this.props
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Edit Tag with id : {tag.name}
            </h1>

            <Formik
              enableReinitialize={true}
              initialValues={{ name: tag.name, color: tag.color }}
              validate={(values) => {
                const errors = {}
                if (!values.name) {
                  errors.name = 'Required'
                }
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                const url = `/api/v1/tags/update/${this.props.match.params.id}`

                const token = document.querySelector(
                  'meta[name="csrf-token"]'
                ).content
                fetch(url, {
                  method: 'POST',
                  headers: {
                    'X-CSRF-Token': token,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(values, null, 2),
                })
                  .then((response) => {
                    if (response.ok) {
                      return response.json()
                    }
                    throw new Error('Network response was not ok.')
                  })
                  .then((response) => this.props.history.push(`/tags`))
                  .catch((error) => console.log(error.message))
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="tagName">Name</label>
                    <input
                      type="name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {errors.name && touched.name && errors.name}
                  </div>

                  <div className="form-group">
                    <label htmlFor="tagName">Color</label>
                    <input
                      type="color"
                      name="color"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.color}
                    />
                    {errors.color && touched.color && errors.color}
                  </div>
                  <button
                    type="submit"
                    className="btn custom-button mt-3"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                  <Link to="/tags" className="btn btn-link mt-3">
                    Back to tags
                  </Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    )
  }
}

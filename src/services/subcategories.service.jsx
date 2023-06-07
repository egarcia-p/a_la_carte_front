import { callExternalApi } from './external-api.service'

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL

export const getAllSubcategoriesResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/subcategories/index`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  }
}

export const getSubCategoryResource = async (accessToken, id) => {
  const config = {
    url: `${apiServerUrl}/api/v1/subcategories/edit/${id}`,
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const { data, error } = await callExternalApi({ config })
  return {
    data: data || null,
    error,
  }
}

export const deleteProtectedResource = async (accessToken, id) => {
  const config = {
    url: `${apiServerUrl}/api/v1/subcategories/destroy/${id}`,
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  }
}

export const createProtectedResource = async (accessToken, data) => {
  const config = {
    url: `${apiServerUrl}/api/v1/subcategories/create`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
  }

  const { data: createdData, error } = await callExternalApi({ config })

  return {
    data: createdData || null,
    error,
  }
}

export const updateProtectedResource = async (accessToken, data) => {
  const body = JSON.stringify(data)
  const config = {
    url: `${apiServerUrl}/api/v1/subcategories/update/${data.id}`,
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data,
  }

  const { data: createdData, error } = await callExternalApi({ config })

  return {
    data: createdData || null,
    error,
  }
}

export const getAdminResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`, //TODO check admin, maybe update subcategories??
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const { data, error } = await callExternalApi({ config })

  return {
    data: data || null,
    error,
  }
}

import { callExternalApi } from "./external-api.service";

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getProtectedResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/categories/index`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};

export const deleteProtectedResource = async (accessToken, id) =>{
  const config = {
    url: `${apiServerUrl}/api/v1/categories/destroy/${id}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
}

export const getAdminResource = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/messages/admin`, //TODO check admin, maybe update categories??
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const { data, error } = await callExternalApi({ config });

  return {
    data: data || null,
    error,
  };
};
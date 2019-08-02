import axios from "axios";
const CR_API_URL =  "http://localhost:9000";

export function prepareHeaders(method) {
  const headers = {};
  const user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("token");
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NmIwODRiNjIwNWU0MDZlNjI4M2M0ZGIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NjQ3MzYxNzN9.PuC4QEWnkhlNg26zMp0hMdZDiJOAeTo26GHbW1in7bU'
  if (["POST", "PUT"].includes(method)) headers["Content-Type"] = "application/json";
  if (user && token) headers.Authorization = `Bearer ${token}`;
  console.log('headers: ', headers);
  return headers;
}

export const newCollection = async(data, endpoint)  => {
  try {
    let response = await axios({
      method: "POST",
      url: `${CR_API_URL}/${endpoint}`,
      headers: prepareHeaders("POST"),
      data
    })
      return response.data
  } catch (error) {
    return error
  }
}

export const getCollection = async(endpoint, filter)  => {
  try {
    let response = await axios({
      method: "GET",
      url: `${CR_API_URL}/${endpoint}`,
      params: {
        filters: filter || JSON.stringify({})
      },
      headers: prepareHeaders("GET")
    })
      return response.data
  } catch (error) {
    return error
  }
}

export const updateCollection = async(id, data, endpoint)  => {
  delete data._v
  delete data.created
  console.log('data: ', data);
  console.log('URL: ',`${CR_API_URL}/${endpoint}/${id}`,);

  try {
    let response = await axios({
      method: "put",
      url: `${CR_API_URL}/${endpoint}/${id}`,
      headers: prepareHeaders("PUT"),
      data,
    })
      return response.data
  } catch (error) {
    console.log("fuckity fuck", error)
    return error
  }
}

export const searchCollectionFilter = async (collection, search, searchField, populateItem, filter) => {
    const populateField = populateItem ? populateItem : []
    const result = await axios.get(`${CR_API_URL}/${collection}`, {
      params: {
        search,
        searchField,
        filters: filter || JSON.stringify({}),
        populate: JSON.stringify(populateField)
      },  
      headers: prepareHeaders("GET"),
      })
      return result.data
};
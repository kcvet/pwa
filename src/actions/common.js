import axios from "axios";
import Notify from '../utils/Notification';
import { notifySuccess, notifyError } from "../components/toast/Toast";
const { PWA_API } = require("../utils/PWA_API");

export function prepareHeaders(method) {
  const headers = {};
  const user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("token");
  // token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1NmIwODRiNjIwNWU0MDZlNjI4M2M0ZGIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NjQ3MzYxNzN9.PuC4QEWnkhlNg26zMp0hMdZDiJOAeTo26GHbW1in7bU'
  if (["POST", "PUT"].includes(method)) headers["Content-Type"] = "application/json";
  if (user && token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export const newCollection = async(data, endpoint)  => {
  try {
    let response = await axios({
      method: "POST",
      url:`${PWA_API}/api/${endpoint}`,
      headers: prepareHeaders("POST"),
      data
    })
      Notify("Successfully created new collection",  notifySuccess("Successfully created new collection"))
      return response.data
  } catch (error) {
    Notify("Error when trying to create a new collection", notifyError("Error when trying to create a new collection"))
    return error
  }
}

export const getCollection = async(endpoint, filter)  => {
  try {
    let response = await axios({
      method: "GET",
      url: `${PWA_API}/api/${endpoint}`,
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
  try {
    let response = await axios({
      method: "put",
      url: `${PWA_API}/api/${endpoint}/${id}`,
      headers: prepareHeaders("PUT"),
      data,
    })
      Notify("Successfully updated collection",  notifySuccess("Successfully updated collection"))
      return response.data
  } catch (error) {
    Notify("Error when trying to update collection", notifyError("Error when trying to update collection"))
    return error
  }
}

export const searchCollectionFilter = async (collection, search, searchField, populateItem, filter) => {
    const populateField = populateItem ? populateItem : []
    const result = await axios.get(`${PWA_API}/${collection}`, {
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
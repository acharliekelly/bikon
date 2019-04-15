import apiUrl from '../apiConfig'
import axios from 'axios'

export const allReports = () => {
  return axios({
    method: 'GET',
    url: apiUrl + '/condreps'
  })
}

export const filterReports = (params) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/condreps?' + params
  })
}

export const myReports = (user) => {

}

export const openReport = (user, reportId) => {

}

export const createReport = (user, params) => {

}

export const updateReport = (user, params) => {

}

export const deleteReport = (user, reportId) => {

}

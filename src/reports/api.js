import apiUrl from '../apiConfig'
import axios from 'axios'

export const allReports = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/condreps',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const myReports = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/my-condreps',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getReport = (user, reportId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/condreps/' + reportId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createReport = (user, params) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/condreps',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      'condrep': {
        'condition': params.condition,
        'geolat': params.geolat,
        'geolong': params.geolong,
        'occurred': params.occurred,
        'notes': params.notes
      }
    }
  })
}

export const updateReport = (user, params) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/condreps/' + params.id,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      'condrep': {
        'condition': params.condition,
        'geolat': params.geolat,
        'geolong': params.geolong,
        'occurred': params.occurred,
        'notes': params.notes
      }
    }
  })
}

export const deleteReport = (user, reportId) => {
  return axios({
    method: 'DELETE',
    url: apiUrl + '/condreps/' + reportId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

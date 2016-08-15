/**
 * Created by govind on 7/27/16.
 */

// var restclient = require('promised-rest-client')({url: 'http://localhost:3000'});
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

// index page
export const INDEX_NAV = 'INDEX_NAV';

export const INDEX_LOAD = 'INDEX_LOAD';
export const INDEX_UNLOAD = 'INDEX_UNLOAD';

export const INDEX_SELECT = 'INDEX_SELECT';
export const INDEX_QUERY = 'INDEX_QUERY';

// index api
export const INDEX_SUCCESS = 'INDEX_SUCCESS';
export const INDEX_FAILURE = 'INDEX_FAILURE';
export const INDEX_REQUEST = 'INDEX_REQUEST';

export const INDEX_WATCHER_UPDATE = 'INDEX_WATCHER_UPDATE';

// Action creators

export function indexLoad(category, selection) {
  console.log('actions.index.js indexLoad: category', category);


  return dispatch => {

    let uri = 'http://localhost:3000/rest/photos';
    let restRequest = {
      url: '/rest/photos',
      category: category
    };

    fetch(uri)
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json);
        dispatch(indexSuccess("photos", json.items));
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });



  };
}

export function indexUnLoad(category, selection) {

  return {
    type: INDEX_UNLOAD,
    category: category,
    items: [
    ]
  };
}

export function indexSuccess(category, items) {

  return {
    type: INDEX_SUCCESS,
    category: category,
    items: items
  };
}

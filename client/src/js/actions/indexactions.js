/**
 * Created by govind on 7/27/16.
 */

// var restclient = require('promised-rest-client')({url: 'http://localhost:3000'});
import fetch from 'isomorphic-fetch';
// import {fetch} from 'whatwg-fetch';
require('es6-promise').polyfill();

// index page
export const INDEX_NAV = 'INDEX_NAV';
export const INDEX_SCROLL = 'INDEX_SCROLL';
export const INDEX_PREV_MORE = 'INDEX_PREV_MORE';
export const INDEX_NEXT_MORE = 'INDEX_NEXT_MORE';

export const INDEX_LOAD = 'INDEX_LOAD';
export const INDEX_UNLOAD = 'INDEX_UNLOAD';

export const INDEX_SELECT = 'INDEX_SELECT';
export const INDEX_QUERY = 'INDEX_QUERY';

// index api
export const INDEX_SUCCESS = 'INDEX_SUCCESS';
export const INDEX_PREV_SUCCESS = 'INDEX_PREV_SUCCESS';
export const INDEX_NEXT_SUCCESS = 'INDEX_NEXT_SUCCESS';

export const INDEX_FAILURE = 'INDEX_FAILURE';
export const INDEX_REQUEST = 'INDEX_REQUEST';

export const INDEX_WATCHER_UPDATE = 'INDEX_WATCHER_UPDATE';

// Action creators

export function indexLoad(category, index) {
  console.log('actions.index.js indexLoad: category', category);

  return dispatch => {

    let uri = 'http://localhost:3000/rest/photos';
    let reqBody = {
      url: '/rest/photos',
      category: category,
      params: {
        from: 0,
        size: 10,
      },
      query: {}
    };

    let restRequest = {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json"
      }
    };


    fetch(uri, restRequest)
      .then(function(response) {
        console.log("indexLoad: ", response);
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json);
        dispatch(indexSuccess("photos", json));
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });

  };
}

export function indexNextMore(category, index) {
  console.log('actions.index.js indexLoad: category: ', category);
  console.log('actions.index.js indexLoad: index: ', index);


  return dispatch => {

    let uri = 'http://localhost:3000/rest/photos';
    let reqBody = {
      url: '/rest/photos',
      category: category,
      params: {
        from: index.result.currentEnd,
        size: 10,
      },
      query: {}
    };

    let restRequest = {
                        method: "POST",
                        body: JSON.stringify(reqBody),
                        headers: {
                          "Content-Type": "application/json"
                        }
                      };

    fetch(uri, restRequest)
      .then(function(response) {
        console.log("indexLoad: ", response);
        return response.json()
      }).then(function(json) {
      console.log('parsed json', json);
      dispatch(indexNextSuccess("photos", json));
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });



  };
}


export function indexUnLoad(category, index) {

  return {
    type: INDEX_UNLOAD,
    category: category,
    items: [
    ]
  };
}
// export function indexScroll(category, pagePosition) {
//
//   return {
//     type: INDEX_SCROLL,
//     category: category,
//     pagePosition: pagePosition
//   };
// }

export function indexSuccess(category, json) {

  console.log("indexSuccess: json: ", json);

  return {
    type: INDEX_SUCCESS,
    category: category,
    hosturl: json.hosturl,
    result: json.result
  };
}

export function indexNextSuccess(category, json) {

  console.log("indexNextSuccess: json: ", json);

  return {
    type: INDEX_NEXT_SUCCESS,
    category: category,
    hosturl: json.hosturl,
    result: json.result
  };
}

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


// actions that should be moved out of this file in future
export const SHOW_MODAL = 'SHOW_MODAL';

// Action creators

export function indexLoad(category, index) {

  return dispatch => {

    let uri = 'http://localhost:3000/rest/' + category;
    let reqBody = {
      url: '/rest/' + category,
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
      dispatch(indexSuccess(category, json));
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });

  };
}

export function indexNextMore(category, index) {

  console.log("indexNextMore action index: ", index);

  return dispatch => {

    let uri = 'http://localhost:3000/rest/' + category;
    // let reqBody = {
    //   url: '/rest/' + category,
    //   category: category,
    //   params: {
    //     from: index.result.currentEnd,
    //     size: 10,
    //   },
    //   query: {}
    // };

    var from = index.getIn(['result', 'currentEnd']);
    console.log("indexNextMore from: ", from);

    let reqBody = {
      url: '/rest/' + category,
      category: category,
      params: {
        from: from,
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
      dispatch(indexNextSuccess(category, json));
    }).catch(function(ex) {
      console.log('parsing failed', ex);
    });



  };
}


export function indexUnLoad(category, index) {
  
  console.log("indexUnLoad");

  return {
    type: INDEX_UNLOAD,
    category: category,
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


  return {
    type: INDEX_SUCCESS,
    category: category,
    hosturl: json.hosturl,
    result: json.result
  };
}

export function indexNextSuccess(category, json) {


  return {
    type: INDEX_NEXT_SUCCESS,
    category: category,
    hosturl: json.hosturl,
    result: json.result
  };
}

export function showModal(category, json) {
  console.log('action showModal: category: ', category);
  console.log('action showModal: json: ', json);

  return {
    type: SHOW_MODAL,
    category: category,
    data: json
  };
}

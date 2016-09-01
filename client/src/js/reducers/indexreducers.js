/**
 * Created by govind on 7/27/16.
 */

import { combineReducers } from 'redux';
import update from 'react/lib/update';

import {INDEX_LOAD, INDEX_UNLOAD, INDEX_SCROLL, INDEX_FAILURE, INDEX_REQUEST, INDEX_SUCCESS, INDEX_NEXT_MORE, INDEX_NEXT_SUCCESS} from '../actions/indexactions';

const statusFilter = {
  all: true,
  values: [
    { label: 'Critical', value: 'Critical' },
    { label: 'Warning', value: 'Warning' },
    { label: 'OK', value: 'OK' },
    { label: 'Disabled', value: 'Disabled' }
  ]
};

const statusAttribute = {name: 'status', label: 'Status', size: 'small',
  header: true, status: true, filter: statusFilter};

// Shape of the application state that is stored in Redux store
const initialState = {
  activeCategory: null,
  responsive: 'multiple',
  categories: {
    photos: {
      label: "Photos and Videos",
      view: 'tiles',
      sort: 'date:dsc',
      result: {
        begin: 0,
        currentBegin: 0,
        currentEnd: 0,
        total: 0,
        items: []
      },
    },
    assets: {
      label: "Assets",
      view: 'list',
      sort: 'name:asc',
      attributes: [
        statusAttribute,
        {name: 'name', label: 'Name', header: true},
        {name: 'model', label: 'Model', secondary: true,
          filter: {
            all: true,
            values: [
              { label: 'bl460c gen1', value: 'bl460c gen1' },
              { label: 'bl460c gen2', value: 'bl460c gen2' },
              { label: 'bl460c gen3', value: 'bl460c gen3' }
            ]
          }
        }
      ]
    },
    contacts: {
      label: "Contacts",
      view: 'table',
      sort: 'name:asc',
      attributes: [
        statusAttribute,
        {name: 'name', label: 'Name', header: true}
      ]
    },
    activity: {
      label: "Activity",
      view: 'table',
      sort: 'created:desc',
      attributes: [
        {name: 'associatedResourceName', label: 'Resource', size: 'medium'},
        statusAttribute,
        {name: 'name', label: 'Name', header: true},
        {name: 'created', label: 'Time',
          timestamp: true, size: 'medium', secondary: true},
        {name: 'state', label: 'State', size: 'medium', secondary: true,
          filter: {
            all: true,
            values: [
              { label: 'Active', value: 'Active' },
              { label: 'Cleared', value: 'Cleared' },
              { label: 'Running', value: 'Running' },
              { label: 'Completed', value: 'Completed' }
            ]
          }
        }
      ]
    }
  }
};


// ...state =>> Using object spread syntax for copying state based on documentation from
// http://redux.js.org/docs/recipes/UsingObjectSpreadOperator.html
// this is where I specify which reducer handles which actions
const handlers = {

  [INDEX_LOAD]: (state = initialState, action) => {

    // action.category has the category
    // action.items has the content

    // var newState = (Object.assign({}, state, state.categories[action.category].items = action.items));
    console.log("REDUCER INDEX_LOAD: ", state);
    var newState = (Object.assign({}, state, {categories: {photos: { result: {items: action.result.items}}} }));

    // return update(state, changes);
    return newState;
  },

  [INDEX_UNLOAD]: (state, action) => {

    var newState = (Object.assign({}, state, {categories: {photos: {items: []}} }));

    return newState;
  },

  [INDEX_SCROLL]: (state = initialState, action) => {

    // action.category has the category
    // action.items has the content
    console.log("REDUCER INDEX_SCROLL: ", state);
    // var newState = (Object.assign({}, state, {categories: {photos: {pagePosition: action.pagePosition}} }));
    var newState = { ...state, categories: {photos: {pagePosition: action.pagePosition}}};
    // { ...state, {categories: {photos: {pagePosition: action.pagePosition}} }};
    console.log("REDUCER INDEX_SCROLL newState: ", newState);

    // return update(state, changes);
    return newState;
  },

  [INDEX_REQUEST]: (state, action) => {

    return state;
  },

  [INDEX_SUCCESS]: (state, action) => {

    console.log("REDUCER INDEX_SUCCESS: ", state);
    console.log("REDUCER INDEX_SUCCESS action: ", action);
    // var newState = Object.assign({}, state, {categories: {photos: {items: action.items}} });
    // var newState = { ...state, categories: {photos: {items: action.items}}};
    var newState = { ...state, categories: {
                      photos: {
                              result: {
                                total: action.result.total,
                                currentEnd: state.categories.photos.result.currentEnd + action.result.count,
                                items: action.result.items
                              }
                            }
                          }
                        };

    console.log("REDUCER INDEX_SUCCESS: new", newState);

    return newState;
  },

  [INDEX_NEXT_SUCCESS]: (state, action) => {

    console.log("REDUCER INDEX_SUCCESS: ", state);
    // var newState = Object.assign({}, state, {categories: {photos: {items: action.items}} });
    // var newState = { ...state, categories: {photos: {items: action.items}}};
    var withNextItems = state.categories.photos.result.items.concat(action.result.items);
    // var newState = { ...state, categories: {photos: { result: {items: withNextItems}} }};
    var newState = { ...state, categories: {
                      photos: {
                        result: {
                          total: action.result.total,
                          currentEnd: state.categories.photos.result.currentEnd + action.result.count,
                          items: withNextItems
                        }
                      }
                    }
                    };


    console.log("REDUCER INDEX_SUCCESS: new", newState);

    return newState;
  },

  [INDEX_FAILURE]: (state, action) => {

    return state;
  },


};

export default function indexReducer (state = initialState, action) {
  // console.log("indexReducer: state: ", state);
  // console.log("indexReducer: action: ", action);
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
};

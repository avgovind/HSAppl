/**
 * Created by govind on 7/27/16.
 */

import { combineReducers } from 'redux';
import update from 'react/lib/update';

import {INDEX_LOAD, INDEX_UNLOAD, INDEX_FAILURE, INDEX_REQUEST, INDEX_SUCCESS} from '../actions/indexactions';

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
      attributes: [
        statusAttribute,
        {name: 'name', label: 'Name', header: true}
      ],
      items: []
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
    console.log("INDEX_LOAD: state: ", state);
    console.log("INDEX_LOAD: action: ", action);

    // action.category has the category
    // action.items has the content

    // var newState = (Object.assign({}, state, state.categories[action.category].items = action.items));
    var newState = (Object.assign({}, state, {categories: {photos: {items: action.items}} }));

    console.log("INDEX_LOAD: newState: ", newState);

    // return update(state, changes);
    return newState;
  },

  [INDEX_UNLOAD]: (state, action) => {
    console.log("INDEX_UNLOAD: state: ", state);
    console.log("INDEX_UNLOAD: action: ", action);

    var newState = (Object.assign({}, state, {categories: {photos: {items: []}} }));

    console.log("INDEX_UNLOAD: newState: ", newState);

    return newState;
  },

  [INDEX_REQUEST]: (state, action) => {

    return state;
  },

  [INDEX_SUCCESS]: (state, action) => {

    var newState = (Object.assign({}, state, {categories: {photos: {items: action.items}} }));

    console.log("INDEX_SUCCESS: newState: ", newState);

    return newState;
  },

  [INDEX_FAILURE]: (state, action) => {


    return state;
  },


};

export default function indexReducer (state = initialState, action) {
  console.log("indexReducer: state: ", state);
  console.log("indexReducer: action: ", action);
  let handler = handlers[action.type];
  if (!handler) return state;
  return { ...state, ...handler(state, action) };
};

/**
 * Created by govind on 7/24/16.
 */

'use strict';
// This module provides the interface to the DB.

var elasticsearch = require('elasticsearch');
var esIndicesConfig = require('./esIndicesConfig');
//var deleteByQuery = require('elasticsearch-deletebyquery');
var Const = require('../common/const');
var errors = require('../common/error');
var _ = require( 'lodash' );

var esPort = process.env.ES_PORT ? process.env.ES_PORT : '9200';
const MAX_RESULT_WINDOW = 10000;

var _client = elasticsearch.Client({
  host: 'localhost:' + esPort,
  log: 'info'
});


exports.getItems = getItems;
exports.createIndex = createIndex;
exports.initIndices = initIndices;
exports.stageNewFiles = stageNewFiles;
exports.addItem = addItem;

function createIndex(indexDef) {
  _client.create(indexDef, function(error, response) {
    // ...
  });
}

function initIndices (allIndices, callback) {

  let promises = _.map(allIndices, (indexSetting) => {

    return _client.indices.exists({
      index: indexSetting.index
    }).then((exists) => {
      if (!exists) {
        console.log("initIndices creating the index: ", indexSetting);
        return _client.indices.create(indexSetting);
      }
      return undefined;
    });
  });


  Promise.all(promises).then((result) => {
    console.log("initIndices promise all: ", result);
  }).catch((err) => {
    log.error('failed to create inices', err);
    callback(err);
  });
}

function stageNewFiles( id, filedata, callback1) {

  console.log("esclient::stageNewFiles filedata: ", filedata);

  let data = esIndicesConfig.hsIndices.stagedFiles;
  data.id = id;
  data.body = filedata;
  data.body.status = "unstaged";

  console.log("esclient::stageNewFiles data: ", data);

  _client.index(data);
}



function getItems( index, params, query, callback1) {
  let param = {
    index: index,
    from: params.from,
    size: params.size
  };
  return _client.search( param,
    ( err, resp ) => {
      if ( err ) {
        console.log("getItems: err: ",err);
        callback1(err);
      } else if ( !resp  ) {
        console.log("getItems: err: ",err);
        callback1(err);
      } else {
        console.log("getItems: resp: ",resp);
        console.log("getItems: resp: ",resp.hits.hits.length);
        let result = {
                      total: resp.hits.total,
                      count: resp.hits.hits.length,
                      items: resp.hits.hits.map((item) => {
                        var returnItem = item._source;
                        console.log("returnItem: ", returnItem);
                        returnItem['id'] = item._id;
                        console.log("returnItem: later ", returnItem);
                        return item._source;
                      })
        };

        callback1(undefined, result);
      }
    });
}

function addItem(index, data, id) {
  console.log("addItem");

  var indexDocument = {
    index: index,
    type: index,
    body: data
  };

  if (!id) {
    _client.index(indexDocument, function (error, response) {
      console.log("addItem: error", error);
      console.log("addItem: response", response);
    });
  }

}


/**
 * Get the client instance of Elasticsearch
 * @param void
 */
function getESClient() {
  return _client;
}

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


/**
 * list all appliances registed in OVP appliance
 */
exports.getAllAppliances = getAllAppliances;
exports.createIndex = createIndex;
exports.initIndices = initIndices;
exports.stageNewFiles = stageNewFiles;

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

  console.log("esclient::stageNewFiles data: ", data);

  _client.index(data);
}


/**
 * list all appliances registed in OVP appliance
 * @param {function} cb     : callback funtion like function( err, appl_list )
 */
function getAllAppliances( cb ) {
  let param = {
    index: Const.appliance.db_index,
    size: MAX_APPLIANCE_COUNT
  };
  return _client.search( param,
    ( err, resp ) => {
      if ( err ) {
        log.error( `Error happened during get all appliances: ${err}` );
        cb( _mapping_error(err), null );
      } else if ( !resp || !resp.hits || !resp.hits.hits ) {
        log.error( `not a valid ES search result:${resp}` );
        cb( errors.INTERNAL_ERROR, null );
      } else {
        log.debug( `return ${resp.hits.total} appliances` );
        let appliance_list = resp.hits.hits.map( item => {
          return _.assign( item._source, {id:item._id} );
        });
        cb( null, appliance_list );
      }
    });
}


/**
 * Get the client instance of Elasticsearch
 * @param void
 */
function getESClient() {
  return _client;
}

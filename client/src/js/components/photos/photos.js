/**
 * Created by govind on 7/22/16.
 */

var React = require('react');
var PhotoFrame = require('./photoframe');
//var actions = require("../../actions/actions");

var Photos = React.createClass({

  getDefaultProps: function () {
    return {
      text: 'Welcome home from props!'
    }
  },

  getInitialState: function () {
    return {
      email: 'avgovind@gmail.com',
      password: '',
      text: 'from getInitialState photosphotosphotosphotosphotos'
    }
  },

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount: function () {

  },

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount: function () {
    //this.props.dispatch(actions.itemsLoad("photos"));

  },


  componentWillUnmount: function () {

  },

  render: function () {
    return (
      <div className="ui grid container">
        <div>
          <PhotoFrame img_src="" desc="test description1" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description2" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description3" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description4" />
        </div>
        <div>
          <PhotoFrame img_src="" desc="test description5" />
        </div>
      </div>
    );
  }
});

//Photos,propTypes = {
//  category: PropTypes.string.isRequired
//
//};

module.exports = Photos;
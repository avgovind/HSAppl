/**
 * Created by govind on 7/22/16.
 */

var React = require('react');

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

  },


  componentWillUnmount: function () {

  },

  render: function () {
    return (
      <div class="ui doubling stackable grid container">
        {this.state.text}

      </div>
    );
  }
});

module.exports = Photos;
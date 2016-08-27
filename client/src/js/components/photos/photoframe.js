/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {itemLoad, itemUnload} from '../../actions/itemactions';

var PhotoFrame = React.createClass({

  getDefaultProps: function () {

    return {
      id: "000",
      src: "jkjkjk",
      desc: 'Welcome home from props!'
    }
  },

  // getInitialState: function () {
  //   return {
  //     key: 0,
  //     img_src: "",
  //     date: "",
  //     location: "",
  //     tags: "",
  //     desc: 'Welcome home from propsvvvvvvvvvvvvv!'
  //   }
  // },

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
    this.props.dispatch(itemLoad("photoframe", {}));
  },


  componentWillUnmount: function () {

  },

  // componentWillReceiveProps(nextProps) {
  //   console.log("photoframe:componentWillReceiveProps...nextProps: ", nextProps);
  //
  //   if (nextProps.category && this.props.category !== nextProps.category) {
  //     this.props.dispatch(itemUnload(this.props.index));
  //     this.props.dispatch(
  //       itemLoad(nextProps.category, nextProps.index, this.props.selection));
  //   }
  //
  // },

  render: function () {

    console.log("photoframe props: ", this.props);

    return (
      <div className="ui card">
        <div className="image">
          <img src={this.props.src}/>
        </div>
        <div className="content">
          <div className="meta">
            <span className="date">{this.props.date}</span>
          </div>
          <div className="meta">
            <span className="location">{this.props.location}</span>
          </div>
          <div className="description">
            {this.props.desc}
          </div>
        </div>
        <div className="extra content">
          <a>
            <i className="user icon"></i>
            {this.props.tags}
          </a>
        </div>
      </div>
    );
  }


});

PhotoFrame.contextTypes = {
  store: PropTypes.object
};

PhotoFrame.propTypes = {
  id: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'photoframe';
  return {
    state

  };
};


export default connect(mapStateToProps)(PhotoFrame);

// module.exports = PhotoFrame;
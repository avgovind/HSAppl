/**
 * Created by govind on 7/16/16.
 */

/*
 * This component is main component
 * This should include the application bar on top of the page
 *  * @type {*|exports|module.exports}
 */


//import React from 'react';
//import {Link} from 'react-router';
//import HSFileUpload from './hsfileupload/hsfileupload';
import React, {Component, PropTypes} from 'react';
// var React = require('react');
var Link = require('react-router').Link;
var HSFileUpload = require('./hsfileupload/hsfileupload');


var MENU_LABELS = {
  home: 'Home',
  contacts: 'Contacts',
  assets: 'Assets',
  browse: 'Browse',
  messages: 'Messages',
  digitallib: 'Digital Library',
  financials: 'Financials',
  medical: 'Medical Information',
  photos: 'Photos',
  travel: 'Travel',
  unknown: 'Unknown Content',
  content: 'Content'
};

class Main extends Component {
//
//
// var Main = React.createClass({

  constructor () {
    super();
    this._onClick = this._onClick.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onSearchClick = this._onSearchClick.bind(this);

  }

  componentDidMount () {

  }

  componentWillUnmount () {

  }

  _onChange (event) {
    this.setState({text: event.target.value});
  }

  _onSearch (event) {
    console.log("Main: _onSearch: event: ", event.target.value);
    console.log("Main: _onSearch: children: ", this.props.children);
    console.log("Main: _onSearch: children: ", this.props.children.props.route.path);
  }
  _onSearchClick (event) {
    console.log("Main: _onSearchClick: event: ", event.target);
  }

  _onClick (event) {
    this.setState({text: event.target.innerText});

    if (event.target.innerText == MENU_LABELS.photos) {

    }
  }

  render () {

    console.log("this.props.children: ", this.props.children);



    var searchBox =
            <div className="menu">
              <div className="ui search" >
                <div className="ui icon input">
                  <input className="prompt" placeholder="Search..." type="text" onChange={this._onChange}/>
                  <i className="search icon"></i>
                </div>
                <div className="results"></div>
              </div>
            </div>;


    return (
      <div>
        <div className="ui stackable menu">

            <a className="item">
              <i className="home icon"></i> <Link to="/">{MENU_LABELS.home}</Link>
            </a>
          <a className="item">
            <i className="user icon"></i><Link to="/contacts">{MENU_LABELS.contacts}</Link>
          </a>
          <a className="item">
            <i className="grid layout icon"></i><Link to="/browse">{MENU_LABELS.browse}</Link>
          </a>
            <a className="item">
              <i className="mail icon"></i> <Link to="/messages">{MENU_LABELS.messages}</Link>
            </a>
            <div className="ui simple dropdown item">
              {MENU_LABELS.content}
              <i className="dropdown icon"></i>
              <div className="menu" onClick={this._onClick}>
                <a className="item"><i className="camera retro icon"></i><Link to="/photos">{MENU_LABELS.photos}</Link></a>
                <a className="item"><i className="book icon"></i><Link to="/digitallibrary">{MENU_LABELS.digitallib}</Link></a>
                <a className="item"><i className="pie chart icon"></i><Link to="/financials">{MENU_LABELS.financials}</Link></a>
                <a className="item"><i className="cubes icon"></i><Link to="/medical">{MENU_LABELS.medical}</Link></a>
                <a className="item"><i className="cubes icon"></i><Link to="/travel">{MENU_LABELS.travel}</Link></a>
                <a className="item"><i className="cubes icon"></i><Link to="/assets">{MENU_LABELS.assets}</Link></a>
                <a className="item"><i className="cubes icon"></i><Link to="/unknown">{MENU_LABELS.unknown}</Link></a>
              </div>
            </div>
            <div className="right item">
              <div className="ui input"><input placeholder="Search..." type="text"/></div>
            </div>
          </div>
          <div className="ui container">
            <div className="column">
              <a>
                <HSFileUpload/>
              </a>
              <a className="ui icon fluid input">
                <i className="search icon"></i>
                <input placeholder="Search..." type="text" onSelect={this._onSearchClick} onChange={this._onSearch}></input>
              </a>
            </div>
          </div>
          <div class="ui divider"></div>
          <div className="ui vertical stripe segment">
            <div>{this.props.children} onSearch={this._onSearch}</div>
          </div>

      </div>

    );


    //return (
    //  <div className='main-container'>
    //    <div className="ui inverted stackable menu">
    //      <a className="item active">
    //        Home
    //      </a>
    //      {featuresMenu}
    //      <a className="item">
    //        More Features
    //      </a>
    //      {searchBox}
    //    </div>
    //    <div className="ui segment">
    //      <p>This is UI segment</p>
    //    </div>
    //      {this.props.children}
    //      {this.state.text}
    //    </div>
    //);
  }
// });
};

module.exports = Main;
/**
 * Created by govind on 7/16/16.
 */

/**
 * This component is main component
 * This should include the application bar on top of the page
 *  * @type {*|exports|module.exports}
 */


var React = require('react');
var {Link} = require('react-router');
var HSFileUpload = require('./hsfileupload/hsfileupload');


var MENU_LABELS = {
  home: 'Home',
  browse: 'Browse',
  messages: 'Messages',
  digitallib: 'Digital Library',
  financials: 'Financials',
  photos: 'Photos',
  content: 'Content'
};


var Main = React.createClass({

  getDefaultProps: function () {
    return {
      text: 'Loading'
    }
  },

  getInitialState: function () {
    return {
      email: '',
      password: ''
    }
  },

  componentDidMount: function () {

  },

  componentWillUnmount: function () {

  },

  _onChange(event) {
    this.setState({text: event.target.value});
  },
  _onClick(event) {
    console.log(event);
    console.log(event.target.innerText);
    this.setState({text: event.target.innerText});

    if (event.target.innerText == MENU_LABELS.photos) {

    }
  },

  render: function () {



    let searchBox =
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
      <div className="pusher">
        <div className="ui stackable menu">
            <a className="item">
              <i className="home icon"></i> <Link to="/">{MENU_LABELS.home}</Link>
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
                <a className="item"><i className="book icon"></i><Link to="/digitallib">{MENU_LABELS.digitallib}</Link></a>
                <a className="item"><i className="pie chart icon"></i><Link to="/financials">{MENU_LABELS.financials}</Link></a>
              </div>
            </div>
            <div className="right item">
              <div className="ui input"><input placeholder="Search..." type="text"/></div>
            </div>
          </div>
          <div>
            <HSFileUpload/>
          </div>
          <div className="ui vertical stripe segment">
            <div>{this.props.children}</div>
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
});

module.exports = Main;
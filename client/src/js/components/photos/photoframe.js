/**
 * Created by govind on 7/23/16.
 */

var React = require('react');

var PhotoFrame = React.createClass({

  getDefaultProps: function () {
    console.log("PhotoFrame getDefaultProps");

    return {
      key: 0,
      img_src: "",
      date: "",
      location: "",
      tags: "",
      desc: 'Welcome home from props!'
    }
  },

  getInitialState: function () {
    return {
      key: 0,
      img_src: "",
      date: "",
      location: "",
      tags: "",
      desc: 'Welcome home from props!'
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
      <div className="ui card">
        <div className="image">
          <img src={this.props.img_src}/>
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

module.exports = PhotoFrame;
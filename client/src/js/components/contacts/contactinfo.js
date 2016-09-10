/**
 * Created by govind on 7/23/16.
 */

import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import {itemLoad, itemUnload} from '../../actions/itemactions';

// var ContactInfo = React.createClass({
class ContactInfo extends Component {

  constructor() {
    super();
    this._onClickImage = this._onClickImage.bind(this);
    this.renderListViewItem = this.renderListViewItem.bind(this);
    this.renderFullView = this.renderFullView.bind(this);
  }

  // getDefaultProps () {
  //
  //   return {
  //     id: "000",
  //     src: "jkjkjk",
  //     desc: 'Welcome home from props!'
  //   }
  // }

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

  _onClickImage() {

    console.log("onClickImage......");

  }




  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount () {

  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount () {
    this.props.dispatch(itemLoad("photoframe", {}));
  }


  componentWillUnmount () {

  }

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

  render () {

    // console.log("photoframe props: ", this.props);

    if (this.props.view === 'listview') {

      return this.renderListViewItem();

    } else if (this.props.view === 'slideview') {

      return this.renderSlideViewItem();

    } else if (this.props.view === 'fullview') {

      return this.renderFullView();
    }

  }

  renderListViewItem () {
    console.log("contacts props: ", this.props);

    return (
        <div className="item">
          <div className="image">
            <img src="/images/wireframe/image.png"></img>
          </div>
          <div className="content">
            <a className="header">{this.props.data.firstname}  {this.props.data.middlename} {this.props.data.lastname}</a>
            <div className="meta">
              <span>Description</span>
            </div>
            <div className="description">
              <p>{this.props.data.email}</p>
            </div>
            <div className="extra">
              Additional Details
            </div>
          </div>
        </div>
      );

  }

  renderSlideViewItem () {


  }

  renderFullView () {

  }


};

ContactInfo.contextTypes = {
  store: PropTypes.object
};

ContactInfo.propTypes = {
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


export default connect(mapStateToProps)(ContactInfo);

// module.exports = ContactInfo;
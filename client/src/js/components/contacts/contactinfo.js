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
    this._onClick = this._onClick.bind(this);
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

  _onClick() {

    console.log("contactInfo onClick......");
    this.props.onSelect(this.props.data);

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
    this.props.dispatch(itemLoad("contactinfo", {}));
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
    const { store } = this.context;

    console.log("item props: ", this.props);

    if (this.props.view === 'listview') {

      return this.renderListViewItem();

    } else if (this.props.view === 'slideview') {

      return this.renderSlideViewItem();

    } else {

      return this.renderFullView();

    }

  }

  renderListViewItem () {
    console.log("item listview props: ", this.props);

    return (
      <div className="ui card item" onClick={this._onClick}>
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
    // console.log("photoframe renderFullView props: ", this.props);
    var contact = this.props.contactitem1.get('result').get('item');
    console.log("contactinfo renderFullView contact: ", contact);

    return (
      <div className="ui grid container">
        <div className="image">
          <img className="ui medium image" src="/images/wireframe/image.png"></img>
        </div>
        <div className="content">
          <a className="header">{contact.firstname}  {contact.middlename} {contact.lastname}</a>
          <div className="meta">
            <span>Description</span>
          </div>
          <div className="description">
            <p>{contact.email}</p>
          </div>
          <div className="extra">
            Additional Details
          </div>
        </div>
      </div>
    );
  }


};

ContactInfo.contextTypes = {
  store: PropTypes.object
};

ContactInfo.propTypes = {
  contactitem1: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    label: PropTypes.string,
    view: PropTypes.string.isRequired,
    result: {
      item: PropTypes.arrayOf(PropTypes.object),
    },
    addRoute: PropTypes.string
  }).isRequired,
  contactitem: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'contactinfo';

  return {
    category: category,
    contactitem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(ContactInfo);

// module.exports = ContactInfo;
/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PhotoFrame from './photoframe';
// var PhotoFrame = require('./photoframe');
// var index = require("../../actions/indexactions");

import {indexLoad, indexUnLoad, indexNextMore, indexNav} from '../../actions/indexactions';
import Immutable, {Map, List} from 'immutable';

// var Photos = React.createClass({
class Photos extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.onClick = this.onClick.bind(this);

  }

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {

  }

  handleScroll(event) {

    if (event.pageY === 0 ) {
      //if pageY == 0 the page is scrolled up to the TOP.
      // If previous items should be queried to server then this is that place
      console.log("handleScroll UP so get previous items");
      // this.props.dispatch(indexPrevMore("photos"));
    } else if (event.pageY === event.view.scrollMaxY) {
      //if pageY == 0 the page is scrolled down to the END.
      // If next items should be queried to server then this is that place
      console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
      this.props.dispatch(indexNextMore("photos", this.props.index));
    }

  }

  onClick(e) {
    console.log("photos clicked ", e);
    this.props.dispatch(indexNav("/photoframe", "photoframe", e));
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps: ", nextProps);
    if (nextProps.category && this.props.category !== nextProps.category) {
      this.props.dispatch(indexUnload(this.props.index));
      this.props.dispatch(
        indexLoad(nextProps.category, nextProps.index, this.props.selection));
    }

  }

  /*
   * This function will be called after render()
   * It is good idea to perform any async operations here as render can show some default
   * content first and this function can asyncronously trigger render() when there is data
   * */
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexLoad("photos", this.props.index));

  }

  componentWillUnmount() {
    console.log("photos componentWillUnmount");

    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("photos", this.props.index));

  }

  render () {
    const { store } = this.context;
    console.log("photos this.props: ", this.props);
    console.log("photos this.props: ", this.props.index.getIn(['result']));

    var items = this.props.index.get('result').get('items');

    // let elements = this.props.index.result.items.map((item, index) => {
    let elements = items.map((item, index) => {
      console.log("photos render item: ", item);

      // return (
      //   <div>
      //     <PhotoFrame id={item.filename} src={'http://192.168.1.130:3000/' + item.filename} desc={item.originalname} view='listview' onSelect={this.onClick}/>
      //   </div>
      // );
      return (
        <div className="raised segment">
          <PhotoFrame photoitem={item} view='listview' onSelect={this.onClick}/>
        </div>
      );
    });

    console.log("elements: ", elements);

    return (
      <div className="ui container stacked segment">

        <div className="ui menu">
          <a className="item">
            Location
          </a>
          <div className="ui floating labeled icon dropdown button">
            <i className="filter icon"></i>
            <span className="text">Camera</span>
            <div className="menu">
              <div className="header">
                Search Issues
              </div>
              <div className="ui left icon input">
                <i className="search icon"></i>
                <input name="search" placeholder="Search..." type="text"></input>
              </div>
              <div className="header">
                <i className="tags icon"></i>
                Filter by tag
              </div>
              <div className="item">
                <div className="ui red empty circular label"></div>
                Important
              </div>
              <div className="item">
                <div className="ui blue empty circular label"></div>
                Announcement
              </div>
              <div className="item">
                <div className="ui black empty circular label"></div>
                Discussion
              </div>
            </div>
          </div>
          <a className="item">
            Date
          </a>
          <a className="item">
            Rating
          </a>
        </div>
        <div className="ui internally celled grid">
          {elements}
        </div>
      </div>
    );
  }
}

Photos.contextTypes = {
  store: PropTypes.object
};

Photos.propTypes = {
  type: PropTypes.string.isRequired,
  hosturl: PropTypes.string.isRequired,

  index: PropTypes.shape({
    category: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    label: PropTypes.string,
    query: PropTypes.object,
    filter: PropTypes.object,
    result: {
      begin: PropTypes.number,
      currentBegin: PropTypes.number,
      currentEnd: PropTypes.number,
      total: PropTypes.number,
      items: PropTypes.arrayOf(PropTypes.object),
    },
    view: PropTypes.oneOf(["table", "tiles", "list"]),
    addRoute: PropTypes.string
  }).isRequired,
  dispatch: PropTypes.func.isRequired
};

// for react-redux
const mapStateToProps = (state) => {
  const category = 'photos';

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};


// module.exports = Photos;
export default connect(mapStateToProps)(Photos);

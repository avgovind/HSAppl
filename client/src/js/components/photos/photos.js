/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PhotoFrame from './photoframe';
// var PhotoFrame = require('./photoframe');
// var index = require("../../actions/indexactions");

import {indexLoad, indexUnLoad, indexNextMore} from '../../actions/indexactions';
import Immutable, {Map, List} from 'immutable';

// var Photos = React.createClass({
class Photos extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

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

      return (
        <div>
          <PhotoFrame id={item.filename} src={'http://192.168.1.130:3000/' + item.filename} desc={item.originalname} view='listview'/>
        </div>
        );
    });

    console.log("elements: ", elements);

    return (
      <div className="ui grid container">
        {elements}
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

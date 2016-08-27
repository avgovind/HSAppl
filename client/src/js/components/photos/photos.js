/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import PhotoFrame from './photoframe';
// var PhotoFrame = require('./photoframe');
// var index = require("../../actions/indexactions");

import {indexLoad, indexUnload} from '../../actions/indexactions';


// var Photos = React.createClass({
class Photos extends Component{

  constructor(props) {
    super(props)

  }

  // getInitialState () {
  //   return {
  //     type: 'items',
  //     category: 'photos',
  //     items: [],
  //     filters: {},
  //     start: 0,
  //     count: 20,
  //     total: 0
  //   }
  // }

  getInitialState() {
    return {
      email: 'avgovind@gmail.com',
      password: '',
      text: 'from getInitialState photosphotosphotosphotosphotos'
    }
  }

  /*
   * This function will be called right after the component mounting on DOM
   * and before render()
   * */
  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
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
    this.props.dispatch(indexLoad("photos", {}));

  }

  componentWillUnmount() {

  }

  render () {
    const { store } = this.context;
    console.log("photos this.props: ", this.props);

    let elements = this.props.index.items.map((item, index) => {

      return (
        <div>
          <PhotoFrame id={item.filename} src={'http://192.168.1.130:3000/' + item.filename} desc={item.originalname} />
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
  category: PropTypes.string.isRequired,
  hosturl: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.object,
  start: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

// for react-redux
const mapStateToProps = (state) => {
  const category = 'photos';

  return {
    category: category,
    index: state.index.categories[category]

  };
};


// module.exports = Photos;

export default connect(mapStateToProps)(Photos);

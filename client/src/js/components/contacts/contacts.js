/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
var Modal = require('react-modal');
import ContactInfo from './contactinfo';

import {indexLoad, indexUnLoad, indexNextMore, showModal} from '../../actions/indexactions';


class Contacts extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this._onAddFriend = this._onAddFriend.bind(this);
    this._showModal = this._showModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

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
      // this.props.dispatch(indexPrevMore("contacts"));
    } else if (event.pageY === event.view.scrollMaxY) {
      //if pageY == 0 the page is scrolled down to the END.
      // If next items should be queried to server then this is that place
      console.log("handleScroll DOWN so get more ahead index: ", this.props.index);
      this.props.dispatch(indexNextMore("contacts", this.props.index));
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
    this.props.dispatch(indexLoad("contacts", this.props.index));

  }

  componentWillUnmount() {
    console.log("contacts componentWillUnmount");
    window.removeEventListener('scroll', this.handleScroll);
    this.props.dispatch(indexUnLoad("contacts", this.props.index));

  }

  _onAddFriend() {

    console.log("onAddFriend!!!!!");

    this.openModal();

  }


  ////////////start - MODAL DIALOG FUNCTIONS/////////////
  _showModal (show) {
    console.log('showing modal...');
    return (
      <Modal
        isOpen={show}
        onRequestClose={this.closeModal}>

        <h2 ref="subtitle">Hello</h2>
        <button onClick={this.closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>    );
  }

  openModal () {
    this.props.dispatch(showModal("contacts", {showModal: true}));
  }

  closeModal () {
    this.props.dispatch(showModal("contacts", {showModal: false}));
  }
  ////////////end - MODAL DIALOG FUNCTIONS/////////////

  render () {
    const { store } = this.context;
    console.log("contacts this.props: ", this.props);

    var items = this.props.index.get('result').get('items');

    let elements = items.map((item, index) => {

      return (

        <div className="ui items">
          <ContactInfo id={item.filename} src={'http://192.168.1.130:3000/' + item.filename} desc={item.originalname} view='listview'/>
        </div>
        );
    });

    console.log("elements: ", elements);
    console.log("ShowModal: ", this.props.index.get('showModal'));

    var modal = this._showModal(this.props.index.get('showModal'));

    return (
      <div className="ui grid container">
        <button class="ui basic button" onClick={this._onAddFriend}>
          <i class="icon user"></i>
          Add Friend
        </button>

        {elements}
        {modal}
      </div>
    );
  }
}

Contacts.contextTypes = {
  store: PropTypes.object
};

Contacts.propTypes = {
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
  const category = 'contacts';
  console.log("contacts mapStateToProps: state: ", state);

  return {
    category: category,
    index: state.index.getIn(['categories', category])

  };
};

// module.exports = contacts;

export default connect(mapStateToProps)(Contacts);

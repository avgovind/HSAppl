/**
 * Created by govind on 7/22/16.
 */
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
var Modal = require('react-modal');
import ContactInfo from './contactinfo';

import {indexLoad, indexUnLoad, indexNextMore, showModal, indexAdd} from '../../actions/indexactions';


class Contacts extends Component{

  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this._onAddFriend = this._onAddFriend.bind(this);
    this._showModal = this._showModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit1 = this.onSubmit1.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeMiddleName = this.onChangeMiddleName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);

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

        <div className="ui form" onSubmit={this.onSubmit1}>
          <div className="fields">
            <div className="field">
              <label>First Name</label>
              <input placeholder="First Name" type="text" onChange={this.onChangeFirstName}></input>
            </div>
            <div className="field">
              <label>Middle Name</label>
              <input placeholder="Middle Name" type="text" onChange={this.onChangeMiddleName}></input>
            </div>
            <div className="field">
              <label>Last Name</label>
              <input placeholder="Last Name" type="text" onChange={this.onChangeLastName}></input>
            </div>
            <div className="field">
              <label>eMail</label>
              <input placeholder="email" type="text" onChange={this.onChangeEmail}></input>
            </div>
          </div>
          <div className="ui submit button" onClick={this.onSubmit1}>Submit</div>
        </div>
      </Modal>    );
  }

  onSubmit1 () {
    this.props.dispatch(indexAdd("contacts", this.state));
  }

  onChangeFirstName (e) {
    console.log("on change firstname value ", e.target.value);
    this.setState({firstname: e.target.value});
  }
  onChangeMiddleName (e) {
    console.log("on change middle name value ", e.target.value);
    this.setState({middlename: e.target.value});
  }
  onChangeLastName (e) {
    console.log("on change lastname value ", e.target.value);
    this.setState({lastname: e.target.value});
  }
  onChangeEmail (e) {
    console.log("on change email value ", e.target.value);
    this.setState({email: e.target.value});
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
      console.log("contacts render item: ", item);
      console.log("contacts render index: ", index);

      return (

        <div className="ui divided items">
          <ContactInfo id={item.id} data={item} view='listview'/>
        </div>
        );
    });

    console.log("elements: ", elements);
    var showModal1 = this.props.index.get('showModal');
    console.log("ShowModal: ", showModal1);

    // var modal = this._showModal(this.props.index.get('showModal'));
    var modal;
    if( showModal1 === true) {
      console.log("ShowModal: true");
      modal = this._showModal(showModal1);
    }

    return (
      <div className="ui grid container">
        <p>
          <button className="ui basic button" onClick={this._onAddFriend}>
            <i className="icon user"></i>
            Add Friend
          </button>
        </p>

        <p>{elements}</p>
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
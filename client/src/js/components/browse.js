/**
 * Created by govind on 9/19/16.
 */


import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

class Browse extends Component {

  constructor() {
    super();
    console.log("Browse");
  }


  render () {
    return (
      <div className="ui equal width center aligned padded grid">
        <div className="ui cube shape">
          <div className="sides">
            <div className="active side">
              <div className="content">
                <div className="center">
                  Photos
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui cube shape" duration="700ms">
          <div className="sides">
            <div className="active side">
              <div className="content">
                <div className="center">
                  Contacts
                </div>
              </div>
            </div>
            <div className="side">
              <div className="content">
                <div className="center">
                  2
                </div>
              </div>
            </div>
            <div className="side">
              <div className="content">
                <div className="center">
                  3
                </div>
              </div>
            </div>
            <div className="side">
              <div className="content">
                <div className="center">
                  4
                </div>
              </div>
            </div>
            <div className="side">
              <div className="content">
                <div className="center">
                  5
                </div>
              </div>
            </div>
            <div className="side">
              <div className="content">
                <div className="center">
                  6
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui card">
          <div className="content">
            <div className="header">Cute Dog</div>
            <div className="meta">2 days ago</div>
            <div className="description">
              <p>Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their tiny stature, and even others for their massive size.</p>
              <p>Many people also have their own barometers for what makes a cute dog.</p>
            </div>
          </div>
        </div>
        <div className="ui four cards">
          <a className="red card">
            <div className="image">
            </div>
          </a>
          <a className="orange card">
            <div className="image">
            </div>
          </a>
          <a className="yellow card">
            <div className="image">
            </div>
          </a>
          <a className="olive card">
            <div className="image">
            </div>
          </a>
          <a className="green card">
            <div className="image">
            </div>
          </a>
          <a className="teal card">
            <div className="image">
            </div>
          </a>
          <a className="blue card">
            <div className="image">
            </div>
          </a>
          <a className="violet card">
            <div className="image">
            </div>
          </a>
          <a className="purple card">
            <div className="image">
            </div>
          </a>
          <a className="pink card">
            <div className="image">
            </div>
          </a>
          <a className="brown card">
            <div className="image">
            </div>
          </a>
          <a className="grey card">
            <div className="image">
            </div>
          </a>
          <a className="black card">
            <div className="image">
            </div>
          </a>
        </div>
        </div>
    );
  }

};

Browse.contextTypes = {
  store: PropTypes.object
};

Browse.propTypes = {
  browseitem1: PropTypes.shape({
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
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  const category = 'browse';

  return {
    category: category,
    contactitem1: state.index.getIn(['categories', category])

  };
};


export default connect(mapStateToProps)(Browse);
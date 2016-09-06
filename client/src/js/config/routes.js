/**
 * Created by govind on 7/16/16.
 */
var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
// var hashHistory = ReactRouter.hashHistory;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Main = require('../components/Main');
var Home = require('../components/Home');
import Photos from '../components/photos/photos';
import PhotoFrame from '../components/photos/photoframe';
import Contacts from '../components/contacts/contacts';

// var routes = (
//   <Router history={browserHistory}>
//     <Route path='/' component={Main}>
//       <IndexRoute component={Home} />
//       <Route path='/photos' component={Photos} />
//       <Route path='/photoframe' component={PhotoFrame} />
//       <Route path='/contacts' component={Contacts} />
//     </Route>
//   </Router>
// );
var routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>
      <IndexRoute component={Home} />
      <Route path='/photos' component={Photos} />
      <Route path='/photoframe' component={PhotoFrame} />
      <Route path='/contacts' component={Contacts} />
    </Route>
  </Router>
);

module.exports = routes;
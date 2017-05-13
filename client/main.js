import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';

import { Links } from '../imports/api/Links';

Tracker.autorun(()=> {
  const isAuthenticated = !!Meteor.userId(); //double makes it true if signed in
  onAuthChange(isAuthenticated);

});




Meteor.startup(() => {
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});

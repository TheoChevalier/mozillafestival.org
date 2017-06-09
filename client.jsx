/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/

import { Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { addLocaleData } from 'react-intl';
import queryParser from './lib/queryParser.js';
import CreateElement from './components/create-element.js';
import locales from './public/locales.json';

var routes = (
  <Route path="/">
    {
      Object.keys(locales).map(function(locale) {
        return (
          <Route key={locale} path={locale}>
            <IndexRoute component={require(`./pages/home.jsx`)}/>
            <Route name="home" path="/" component={require(`./pages/home.jsx`)} />
            <Route name="proposals" path="/proposals" component={require(`./pages/proposals/proposals.jsx`)} />
            <Route name="location" path="/location" component={require(`./pages/location.jsx`)} />
            <Route name="about" path="/about" component={require(`./pages/about.jsx`)} />
            <Route name="contact" path="/contact" component={require(`./pages/contact.jsx`)} />
            <Route name="expect" path="/expect" component={require(`./pages/expect.jsx`)} />
            <Route name="guidelines" path="/guidelines" component={require(`./pages/guidelines.jsx`)} />
            <Route name="volunteer" path="/volunteer" component={require(`./pages/volunteer.jsx`)} />
            <Route name="projects" path="/projects" component={require(`./pages/projects.jsx`)} />
            <Route name="team" path="/team" component={require(`./pages/team.jsx`)} >
              <Route path=":tab" component={require(`./pages/team.jsx`)} />
            </Route>
            <Route name="submission-process" path="/submission-process" component={require(`./pages/submission-process.jsx`)} />
            <Route name="spaces" path="/spaces" component={require(`./pages/spaces.jsx`)} />
            <Route name="fringe-events" path="/fringe" component={require(`./pages/fringe-events.jsx`)} />
            <Route name="fringe-event-add-success" path="/fringe-event-add-success" component={require(`./pages/fringe-event-add-success.jsx`)} />
            <Route name="tickets" path="/tickets" component={require(`./pages/tickets.jsx`)} />
            <Redirect from="*" to={"/" + locale} />
          </Route>
        );
      })
    }
    <Redirect from="*" to="/" />
  </Route>
);

module.exports = routes;

/* ********************
* temporarily hiding these routes
* leaving code here so we can quickly turn these pages back on in June and September
******************** */

// <Route name="remote" path="/remote" handler={require('./pages/remote.jsx')} />


function createElement(Component, props) {
  var locale = window.location.pathname.split("/")[1];
  var query = queryParser(props.location.query, locale);
  var ReactIntlLocaleData = window.ReactIntlLocaleData;

  Object.keys(ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(ReactIntlLocaleData[lang]);
  });

  return (
    <CreateElement {...query.initialState} locale={locale}>
      <Component {...props} {...query.values} />
    </CreateElement>
  );
}

ReactDOM.render(
  <Router createElement={createElement} history={browserHistory}>
    {routes}
  </Router>,
  document.querySelector("#my-app")
);

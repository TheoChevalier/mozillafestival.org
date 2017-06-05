import React from 'react';
import {Router, Route, Redirect, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';
import Proposals from './pages/proposals/proposals.jsx';
import English from './pages/proposals/language/English.json';
import Deutsch from './pages/proposals/language/Deutsch.json';
import Espanol from './pages/proposals/language/Espanol.json';
import Francais from './pages/proposals/language/Francais.json';

var ProposalEnglish = () => ( <Proposals lang="English" localized={English} /> );
var ProposalDeutsch = () => ( <Proposals lang="Deutsch" localized={Deutsch} /> );
var ProposalEspanol = () => ( <Proposals lang="Espanol" localized={Espanol} /> );
var ProposalFrancais = () => ( <Proposals lang="Francais" localized={Francais} /> );

var routes = (
  <Router history={browserHistory} onUpdate={() => {window.scrollTo(0, 0)}}>
    <Route name="home" path="/" component={require(`./pages/home.jsx`)} />
    <Route name="proposals" path="/proposals" component={ProposalEnglish} />
    <Route name="proposals-deutsch" path="/proposals-deutsch" component={ProposalDeutsch} />
    <Route name="proposals-espanol" path="/proposals-espanol" component={ProposalEspanol} />
    <Route name="proposals-francais" path="/proposals-francais" component={ProposalFrancais} />
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
  </Router>
);

/* ********************
* temporarily hiding these routes
* leaving code here so we can quickly turn these pages back on in June and September
******************** */

// <Route name="remote" path="/remote" handler={require('./pages/remote.jsx')} />

ReactDOM.render(routes, document.querySelector(`#my-app`));

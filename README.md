# The Mozilla Festival Website

- Production: https://mozillafestival.org
- Staging: https://mozillafestival-org-staging.herokuapp.com/

## Setup

```bash
$> npm install
$> cp sample.env .env
```

## To run

```bash
$> npm start
```

By default this will run the website on [http://localhost:9090](http://localhost:9090)

## Development

Deployment to `staging` server is automated via [Heroku](https://heroku.com).

`master` – Changes made to the `master` branch triggers staging site deployment: [https://mozillafestival-org-staging.herokuapp.com/](https://mozillafestival-org-staging.herokuapp.com/)

Production pushes are handled manually. Email [Mozilla Foundation DevOps](mailto:devops@mozillafoundation.org) or an active contributor to this repo to ask about a production push.



## Environment Variables
- `PORT` (optional)
- `PROPOSAL_SPREADSHEET_ID_2017`: Google Spreadsheet id that you are storing the proposal submissions to.
- `GOOGLE_API_CLIENT_EMAIL_2017`: Your [Google Service Account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) client email created for MozFest.
- `GOOGLE_API_PRIVATE_KEY_2017`: The key associated with the client email.
- `GITHUB_BOT_TOKEN_2017`: [GitHub personal token](https://github.com/settings/tokens) you created for MozFest.
- `GITHUB_REPO_OWNER_2017`: The owner of the repo that you are posting the proposals to. e.g., if the repo is at https://github.com/MozillaFoundation/mozfest-program-2017 set `GITHUB_REPO_OWNER_2017` to `MozillaFoundation`.
- `GITHUB_REPO_NAME_2017`: The name of the repo that you are posting the proposals to. e.g., if the repo is at https://github.com/MozillaFoundation/mozfest-program-2017 set `GITHUB_REPO_NAME_2017` to `mozfest-program-2017`.



## Localized proposal forms

MozFest site currently is only available in English. However, this year (2017) we offer proposal form in English(`/proposals`) plus three non-English languages - Spanish(`/proposals-espanol`), French(`/proposals-francais`), and German(`/proposals-deutsch)`. Note that there's no localization infrastructure in place that automatically pulls localized strings from an external resource. Localized strings and proposal pages are created manually:

1. clone `pages/proposals/language/English.json` and rename it to `Newlanguage.json`
2. create a route for the new language in `client.jsx`. Something like:
```jsx
import Newlanguage from './pages/proposals/language/Newlanguage.json';
...
var ProposalNewlanguage = () => ( <Proposals lang="Newlanguage" localizedStrings={Newlanguage} /> );
...
var routes = (
  <Router ...>
    ...
    <Route name="proposals-newlanguage" path="/proposals-newlanguage" component={ProposalNewlanguage} />
    ...
  </Router>
);
...

```
3. replace all the English strings in `Newlanguage.json` with the localized strings. (**NOTE:** make sure the strings you are pasting in don't have scripts in them as these strings will be rendered as HTML without sanitization.)

var React = require('react');
var Link = require('react-router').Link;
var Header = require('../../components/header.jsx');
var Footer = require('../../components/footer.jsx');
var Jumbotron = require('../../components/jumbotron.jsx');
var Router = require('react-router');
var Form = require('react-formbuilder').Form;
var fields = require('./form/fields');
var generateHelmet = require('../../lib/helmet.jsx');

const PRE_SUBMIT_LABEL = `Submit`; // user facing text
const SUBMITTING_LABEL = `Submitting...`; // user facing text
const SUBMISSION_STATUS_SUCCESS = `success`;
const SUBMISSION_STATUS_FAIL = `fail`;

var Proposal = React.createClass({
  pageMetaDescription: "Session proposals",
  getInitialState() {
    return {
      formValues: {},
      submitting: false,
      submissionStatus: ``,
      showFormInvalidNotice: false,
      stringSource: require(`./language/${this.props.lang}.json`)
    };
  },
  componentDidMount() {
    console.log("- - -> LANG =", this.props.lang);
    console.log("this.state.stringSource", this.state.stringSource);
  },
  handleSubmitAnother(event) {
    event.preventDefault();
    this.setState(this.getInitialState());
  },
  handleFormUpdate(evt, name, field, value) {
    let formValues = this.state.formValues;
    formValues[name] = value;
    this.setState({ 
      formValues,
      // hide notice once user starts typing again
      // this is a quick fix.
      showFormInvalidNotice: false
    });
  },
  handleFormSubmit(event) {
    event.preventDefault();

    this.refs.formPartOne.validates(partOneIsValid => {
      this.refs.formPartTwo.validates(partTwoIsValid => {
        this.refs.formPartThree.validates(partThreeIsValid => {
          this.refs.formPartFour.validates(partFourIsValid => {
            if (!partOneIsValid) console.error(`Form Part One does not pass validation!`);
            if (!partTwoIsValid) console.error(`Form Part Two does not pass validation!`);
            if (!partThreeIsValid) console.error(`Form Part Three does not pass validation!`);
            if (!partFourIsValid) console.error(`Form Part Four does not pass validation!`);

            if (partOneIsValid && partTwoIsValid && partThreeIsValid && partFourIsValid) {
              this.setState({
                submitting: true,
                showFormInvalidNotice: false
              }, () => {
                this.submitProposal(this.state.formValues);
              });
            } else {
              this.setState({showFormInvalidNotice: true});
            }
          });
        });
      });      
    });

  },
  formatProposal(proposal) {
    let formatted = Object.assign({}, proposal);
    let additionalLang = formatted.additionallanguage;
    let otherAdditionalLang = formatted.additionallanguageother;

    if (additionalLang === `Other`) {
      delete formatted.additionallanguage;
      delete formatted.additionallanguageother;

      // we record "additionallanguage" only if user has specified the language
      if (otherAdditionalLang) {
        formatted.additionallanguage = `Other: ${otherAdditionalLang}`;
      }
    }

    if (formatted.secondaryspace === `None`) {
      delete formatted.secondaryspace;
    }

    formatted.travelstipend = formatted.travelstipend === this.state.stringSource.form_field_options.stipendrequired ? `required` : ``;

    return formatted;
  },
  submitProposal(proposal) {
    let formattedProposal = this.formatProposal(proposal);

    let request = new XMLHttpRequest();
    request.open(`POST`, `/add-proposal`, true);
    request.setRequestHeader("Content-type", "application/json");

    request.onload = (event) => {
      let resStatus = event.currentTarget.status;

      this.setState({ 
        submitting: false, 
        submissionStatus: (resStatus >= 200 && resStatus < 400) ? SUBMISSION_STATUS_SUCCESS : SUBMISSION_STATUS_FAIL
      });
    };

    request.onerror = (err) => {
      console.log(err);
    };

    request.send(JSON.stringify(formattedProposal));
  },
  renderForm() {
    let stringSource = this.state.stringSource;

    return (
      <div className="content wide">
        <div className="form-section">
          {this.renderIntro(stringSource.form_section_intro.background)}
          <Form ref="formPartOne" 
            fields={fields.createPartOneFields(stringSource)}
            inlineErrors={true}
            onUpdate={this.handleFormUpdate} />
        </div>
        <div className="form-section">
          {this.renderIntro(stringSource.form_section_intro.space)}
          <Form ref="formPartTwo" 
            fields={fields.createPartTwoFields(stringSource)}
            inlineErrors={true}
            onUpdate={this.handleFormUpdate} />
        </div>
        <div className="form-section">
          {this.renderIntro(stringSource.form_section_intro.describe)}
          <Form ref="formPartThree" 
            fields={fields.createPartThreeFields(stringSource)}
            inlineErrors={true}
            onUpdate={this.handleFormUpdate} />
        </div>
        <div className="form-section">
          {this.renderIntro(stringSource.form_section_intro.travel)}
          <Form ref="formPartFour" 
            fields={fields.createPartFourFields(stringSource)}
            inlineErrors={true}
            onUpdate={this.handleFormUpdate} />
        </div>
        <div className="form-section">
          {this.renderIntro(stringSource.form_section_intro.material)}
          <Form ref="formPartFive" 
            fields={fields.createPartFiveFields(stringSource)}
            inlineErrors={true}
            onUpdate={this.handleFormUpdate} />
        </div>
        <div>
          <button
            ref="submitBtn" 
            className="btn btn-primary-outline mr-3 my-5"
            type="submit"
            onClick={this.handleFormSubmit}
            disabled={this.state.submitting ? `disabled` : null}
          >{ this.state.submitting ? SUBMITTING_LABEL : PRE_SUBMIT_LABEL }</button>
          { this.state.showFormInvalidNotice && <div className="d-inline-block form-invalid-error">Something isn't right. Please fix the errors indicated above.</div> }
        </div>

        { !this.state.submitting && this.state.submissionStatus === SUBMISSION_STATUS_FAIL && this.renderSubmissionFail() }
      </div>
    )
  },
  renderIntro(content) {
    let paragraphs = content.body.map((paragraph) => {
      // using dangerouslySetInnerHTML is okay here since we are pulling strings from a static json file, not user content or anything change dynamically over time without our attention
      return <p dangerouslySetInnerHTML={{__html: paragraph}}></p>;
    });

    return (
      <div>
        <h1>{content.header}</h1>
        { paragraphs }
      </div>
    );
  },
  renderSubmissionSuccess() {
    return (
      <div className="centered content wide">
        <h1 id="success">Success!</h1>
        <p>Thank you for your session proposal.</p>
        <button className="btn-link submit-another" onClick={this.handleSubmitAnother}>Want to submit another?</button>
      </div>
    );
  },
  renderSubmissionFail() {
    return (
      <div className="text-center server-error mb-5 px-2 py-4">
        <p className="m-0"><strong>Sorry!</strong></p>
        <p className="m-0">We are unable to submit your proposal at the moment.</p>
        <p className="m-0">Please try again or <a href="mailto:festival@mozilla.org">contact us</a>.</p>
      </div>
    );
  },
  renderMainContent() {
    if (!this.state.submitting && this.state.submissionStatus === SUBMISSION_STATUS_SUCCESS) {
      return this.renderSubmissionSuccess();
    }

    return this.renderForm();
  },
  render: function() {
    return (
      <div className="proposals-page">
        <Header/>
        <Jumbotron image="/assets/images/proposals.jpg"
                  image2x="/assets/images/proposals.jpg">
          <h1>{this.state.stringSource.page_banner_header}</h1>
          <div className="deadline">
            <span>{this.state.stringSource.page_banner_subheader}</span>
          </div>
        </Jumbotron>
        {generateHelmet(this.pageMetaDescription)}
        <div className="white-background">
          {this.renderMainContent()}
        </div>
        <Footer />
      </div>
    );
  }
});

module.exports = Proposal;

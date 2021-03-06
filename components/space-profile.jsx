var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var slugify = require('slugify');
var ImageTag = require('./imagetag.jsx');

var BioTooltip = React.createClass({
  render: function() {
    return(
      <div className="bio-section">
        <div className="tooltip-arrow"></div>
        <div className="content-box">
          { this.props.photoSrc ? <img src={this.props.photoSrc} /> : null }
          { this.props.bio ? <div>{this.props.bio}</div> : null }
        </div>
      </div>
    );
  }
});

var SpacePathwayProfile = React.createClass({
  getDefaultProps: function() {
    return {
      linkText: "Propose a session in this space.",
      linkTo: "/proposals",
      showWranglerLink: false
    }
  },
  render: function() {
    var id = slugify(this.props.name);
    var showWranglerLink = this.props.showWranglerLink;

    return (
      <div className="space-profile" id={id}>
        <div className="detail">
          <div className="header">
            { this.props.iconPath ? <div className="image-container"><ImageTag alt={`${this.props.name} icon`} src1x={this.props.iconPath} width={this.props.iconWidth} /></div>
                                  : null}
            <h1><a href={"#"+id}>{this.props.name}</a></h1>
          </div>
          { this.props.type ? <div className="type">{this.props.type}</div> : null }
          <div className="description">{this.props.description}</div>
          <p><Link to={this.props.linkTo}>{this.props.linkText}</Link></p>
        </div>
        <div className="contacts">
          { this.props.contacts ? <h2>{(this.props.contacts.length > 1) ? this.props.contactTitle + "s" : this.props.contactTitle}</h2>
                                : null}
          <ul>
          {
            this.props.contacts ? this.props.contacts.map(function(contact) {
              return (
                <li key={contact.name}>
                  { showWranglerLink ? <Link to={"/team/wranglers#"+slugify(contact.name)}>{contact.name}</Link>
                                     : contact.name}
                  { contact.bio ? <BioTooltip {...contact.bio} /> : null }
                </li>
              )
            }) : null
          }
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = SpacePathwayProfile;

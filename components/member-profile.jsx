var React = require('react');
var slugify = require('slugify');

var MemberProfile = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string,
    twitter: React.PropTypes.string,
    pic: React.PropTypes.string,
    bio: React.PropTypes.object
  },
  render: function() {
    let id = slugify(this.props.name);

    return (
      <div className="row my-5 member-profile" id={id}>
        <div className="col-sm-3 center-vertical">
          <img className="rounded-circle" src={this.props.pic || `/assets/images/team/placeholder.jpg` }/>
        </div>
        <div className="col-sm-9">
          <h3 className="mb-0 name"><a href={`#`+id}>{this.props.name}</a></h3>
          <div className="subhead">
            { this.props.title ? <h4 className="title">{this.props.title}</h4> : null }
            { this.props.twitter ? <h4 className="twitter"><a href={"https://twitter.com/"+this.props.twitter}>{this.props.twitter}</a></h4> : null }
          </div>
          { this.props.bio ? <div>{this.props.bio}</div> : null }
        </div>
      </div>
    );
  }
});

module.exports = MemberProfile;

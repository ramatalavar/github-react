import React, { Component } from 'react';
import { Media, Image, Tab, Row, Col, Nav, NavItem, Badge, Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import RepoList from './RepoList';
import DataStore from '../store/DataStore';
import RepoCardView from './RepoCardView';

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      repositories: [],
      popularRepos: [],
      selectedTab: "overview"
    };
    this.getUserDetails();
  }

  getUserDetails() {
    axios.get("https://api.github.com/users/" + this.props.match.params.name)
    .then((response) => {
      this.setState({
        userInfo: response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  displayPopularRepos() {
    let popularRepos = DataStore.getLocalData('popularRepos');
    this.setState({
      popularRepos: popularRepos
    });
  }

  componentWillUnmount() {
    DataStore.removeData('popularRepos');
  }

  handleTabSelect(tab) {
    this.setState({
      selectedTab: tab
    })
  }

  render() {
    const selectedTab = this.state.selectedTab;

    return (
      <Media className="user-details-container">
        <Media.Left>
          <Image rounded src={this.state.userInfo.avatar_url} style={{ height: 230 }} />
          <div className="details">
            <h3>{this.state.userInfo.name}</h3>
            <h5>{this.state.userInfo.login}</h5>
            <p className="bio">{this.state.userInfo.bio}</p>
          </div>
          <div className="user-info-container">
            <UserInfoLine glyphType="company" name={this.state.userInfo.company} />
            <UserInfoLine glyphType="location" name={this.state.userInfo.location} />
            <UserInfoLine glyphType="email" name={this.state.userInfo.email} />
            <UserInfoLine glyphType="blog" name={this.state.userInfo.blog} />
          </div>
        </Media.Left>
        <Media.Body>
          <Tab.Container id="custom-tab-container" defaultActiveKey={this.state.selectedTab} className="tab-container">
            <Row className="clearfix">
              <Col sm={12}>
                <Nav bsStyle="tabs" onSelect={this.handleTabSelect.bind(this)}>
                  <NavItem eventKey="overview">
                    Overview
                  </NavItem>
                  <NavItem eventKey="repos">
                    Respositories <Badge>{this.state.userInfo.public_repos}</Badge>
                  </NavItem>
                  <NavItem eventKey="stars" className={this.state.userInfo.public_repos ? '' : 'hide'}>
                    Stars <Badge>{this.state.userInfo.public_repos}</Badge>
                  </NavItem>
                  <NavItem eventKey="followers" className={this.state.userInfo.followers ? '' : 'hide'}>
                    Followers <Badge>{this.state.userInfo.followers}</Badge>
                  </NavItem>
                  <NavItem eventKey="following" className={this.state.userInfo.following ? '' : 'hide'}>
                    Following <Badge>{this.state.userInfo.following}</Badge>
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="overview">
                    <h2 className="repo-title">Popular Repositories</h2>
                    <div className="repo-cardview-container">
                      {
                        this.state.popularRepos.map((repo) => {
                          return <RepoCardView repo={repo} key={repo.id}  />
                        })
                      }
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="repos">
                    {
                      (selectedTab === "repos" || selectedTab === "overview") ?
                      <RepoList tabName={selectedTab} popularRepos={this.displayPopularRepos.bind(this)} userName={this.props.match.params.name} />
                      : null
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="stars">
                    {
                      selectedTab === "stars" ?
                      <RepoList tabName={selectedTab} userName={this.props.match.params.name} />
                      : null
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="followers">
                    Followers
                  </Tab.Pane>
                  <Tab.Pane eventKey="following">
                    Following
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Media.Body>
      </Media>
    )
  }
};

export default UserDetails;

function getGlyphIconName(name) {
  let glypName;
  switch (name) {
    case 'location':
      glypName = 'map-marker';
      break;
    case 'company':
      glypName = 'user';
      break;
    case 'email':
      glypName = 'envelope';
      break;
    case 'blog':
      glypName = 'link';
      break;
    default:
  }
  return glypName;
};

function UserInfoLine(props) {
  if (!props.name) {
    return null;
  } else {
    let glypName = getGlyphIconName(props.glyphType);
    let name = (glypName === 'link' && props.name.indexOf('http') > -1) ? props.name : 'http://' + props.name;
    return (
      <div className="user-info">
        <Glyphicon glyph={glypName} />
        {
          glypName === 'link' ?
          <a href={name} target="_blank">{name}</a> :
          (glypName === 'envelope') ?
          <a href="mailto:{props.name}" >{name}</a> : <span>{props.name}</span>
        }
      </div>
    )
  }

};

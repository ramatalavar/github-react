import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Media, Image, Glyphicon, Pagination } from 'react-bootstrap';
import moment from 'moment';
import languageColors from './data/colors';
import axios from 'axios';
import AppLoading from './AppLoading';
import TextTruncate from './helpers/truncate';
import DataStore from './store/DataStore';

const URL = "https://api.github.com/search/repositories?q=";

class RepoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm || "",
      activePage: 1,
      totalPages: 34,
      repositories: props.repositories || [],
      language: props.language || null,
      initialLoading: true,
      isUpdating: false,
      userName: props.userName || ""
    };
  }

  componentDidMount() {
    this.fetchRepositories();
  }

  componentWillReceiveProps(nextProps) {
    let { searchTerm, language } = this.props;
    if (nextProps.searchTerm !== searchTerm || nextProps.language !== language) {
      this.setState({
        searchTerm: nextProps.searchTerm,
        language: nextProps.language,
        isUpdating: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { searchTerm, activePage, language } = this.state;

    if (prevState.searchTerm !== searchTerm || prevState.activePage !== activePage || prevState.language !== language) {
      this.fetchRepositories();
    }
  }

  getRepoListUrl() {
    let url = "";
    let languageFilter;
    let { searchTerm, language, activePage } = this.state;
    if (searchTerm) {
      languageFilter = "&language:";
      url += searchTerm;
    }
    languageFilter = languageFilter ? languageFilter : "language:"
    url = url + languageFilter;

    if (language) {
      url += language;
    }

    url += `&page=${activePage}`;

    return URL + url;
  }

  getUserRepoListUrl() {
    let tabName = this.props.tabName;

    if (tabName === 'stars') {
      return `https://api.github.com/users/${this.state.userName}/starred`;
    }

    return `https://api.github.com/users/${this.state.userName}/repos?sort=updated`;
  }

  fetchRepositories() {
    let url = this.state.userName ? this.getUserRepoListUrl() : this.getRepoListUrl();

    axios.get(url).then((response) => {
      this.handleReposResponse(response);
    }).catch((error) => {
      console.log(error);
    })
  }

  handleReposResponse(response) {
    let repos, pages;
    if (this.state.userName) {
      repos = response.data;
      pages = Math.round(repos.length/30);
    } else {
      repos = response.data.items;
      pages = Math.min(Math.round(response.data.total_count/30), 34);
    }

    if (this.state.userName && !DataStore.getLocalData('popularRepos')) {
      DataStore.saveLocalData("popularRepos", response.data.slice(0, 6));
      this.props.popularRepos();
    }

    this.setState({
      repositories: repos,
      initialLoading: false,
      isUpdating: false,
      totalPages: pages
    });
  }

  handleSelect(event) {
    this.setState({
      activePage: event,
      isUpdating: true
    });
  }

  render() {
    const isUserPage = this.state.userName ? true : false;
    const isRepoTab = this.props.tabName === "repos" ? true : false;

    return (
      <div className="repositiories_container">
        {
          this.state.initialLoading ?
          <AppLoading />
          :
          <div className={this.state.isUpdating ? 'updating' : ''}>
            {
              this.state.isUpdating ?
              <AppLoading /> : null
            }
            <ListGroup>
              {this.state.repositories.map((repo) => {
                return (
                  <ListGroupItem key={repo.id}>
                    <Media>
                      <Media.Left align="middle" className={this.state.userName ? "no-user" : ''}>
                        <Link to={`/users/${repo.owner.login}`}>
                          <Image rounded style={{ width: 50, height: 50 }} src={repo.owner.avatar_url} />
                          <h5>{repo.owner.login}</h5>
                        </Link>
                      </Media.Left>
                      <Media.Body align="middle">
                        <Media.Heading>
                          <a href={repo.html_url} target="_blank">
                            {(isUserPage && isRepoTab) ? repo.name : repo.full_name}
                          </a>
                        </Media.Heading>
                        <TextTruncate text={repo.description} charLimit={150} className="description" />
                        <div className="gist-updates">
                          {
                            repo.language ?
                            <span className="update-item">
                              <span className="language_icon" style={{ background: (languageColors[repo.language] ? languageColors[repo.language]["color"] : '')}}></span>
                              {repo.language}
                            </span> : null
                          }
                          {
                            repo.stargazers_count ?
                            <span className="update-item">
                              <Glyphicon glyph="star" />
                              {repo.stargazers_count}
                            </span> : null
                          }
                          {
                            repo.forks_count ?
                            <span className="update-item">
                              <Glyphicon glyph="star" />
                              {repo.forks_count}
                            </span> : null
                          }

                          <span className="update-item" title={moment(repo.updated_at).format('LLL')}>
                            Updated {moment(repo.updated_at).fromNow()}
                          </span>
                        </div>
                      </Media.Body>
                    </Media>
                  </ListGroupItem>
                )
              }, this)}
            </ListGroup>
            {
              this.state.totalPages > 1 ?
              <div className="pagination-container">
                <Pagination
                  first
                  last
                  next
                  prev
                  ellipsis
                  boundaryLinks
                  bsSize="small"
                  items={this.state.totalPages}
                  maxButtons={5}
                  activePage={this.state.activePage}
                  onSelect={this.handleSelect.bind(this)} />
              </div> : null
            }

          </div>
        }
      </div>
    )
  }
};

export default RepoList;

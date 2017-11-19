import React, { Component } from 'react';
import languageColors from '../data/colors';
import moment from 'moment';
import TextTruncate from '../helpers/truncate';
import { Glyphicon } from 'react-bootstrap';

class RepoCardView extends Component {
  render() {
    const repo = this.props.repo;

    return (
      <div className="repos-card-item">
        <p><a href={repo.html_url}>{repo.name}</a></p>
        <TextTruncate text={repo.description} charLimit={50} className="description"/>
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
      </div>
    )
  }
};

export default RepoCardView;

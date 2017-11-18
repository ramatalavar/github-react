import React, { Component } from 'react';
import Input from './Input';
import RepoList from './RepoList';
import LanguagesFilter from './LanguagesFilter';
import { Row, Col } from 'react-bootstrap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      language: null,
    };
  }

  searchRepositories(event) {
    this.setState({
      searchTerm: event.target.value
    });
  }

  filterRepositories(name, event) {
    this.setState({
      language: name
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={8} lg={8} md={8}>
            <Input ref={'InputField'} value={this.state.searchTerm} searchRepo={this.searchRepositories.bind(this)} />
            <RepoList language={this.state.language} searchTerm={this.state.searchTerm} />
          </Col>
          <Col sm={4} md={4} lg={4}>
            <LanguagesFilter handleClick={this.filterRepositories.bind(this)} />
          </Col>
        </Row>

      </div>
    )
  }
};

export default Home;

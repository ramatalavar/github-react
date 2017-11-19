import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

const LANGUAGES = [
  { "id": 1, "name": "All Languages", "selected": true },
  { "id": 2, "name": "C++", "selected": false },
  { "id": 3, "name": "Java", "selected": false },
  { "id": 4, "name": "Javascript", "selected": false },
  { "id": 5, "name": "HTML", "selected": false },
  { "id": 6, "name": "PHP", "selected": false },
  { "id": 7, "name": "Ruby", "selected": false },
  { "id": 8, "name": "Python", "selected": false },
  { "id": 9, "name": "Go", "selected": false }
];

class LanguageFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: LANGUAGES
    }
  }

  handleClick(name, event) {
    this.state.languages.map((language) => {
      if (language.name === name) {
        language.selected = true;
      } else {
        language.selected = false;
      }
      return language;
    });
    this.props.handleClick(name);
  }

  render() {
    return(
      <ListGroup className="language-list">
        {
          this.state.languages.map((language, index) => {
            return (
              <ListGroupItem key={language.id} onClick={this.handleClick.bind(this, language.name)} href="#" active={language.selected}>
                {language.name}
                {
                  language.selected ? <Glyphicon glyph="ok"  className="tick-mark" /> : null
                }
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    )
  }
};

export default LanguageFilter;

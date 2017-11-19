import React, { Component } from 'react';

class Input extends Component {
  
  handleSearch(event) {
    if (event.keyCode === 13) {
      this.props.searchRepo(event);
    }
  }

  render() {
    return(
      <div className="search-container">
        <input type="text" ref="input"
        defaultValue={this.props.value}
        placeholder="Search repositiories"
        onKeyUp={this.handleSearch.bind(this)}
        autoFocus="true"/>
      </div>
    )
  }
};

export default Input;

import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    var valueToSearch = event.target.value;
    this.setState({
      searchValue: valueToSearch
    });
  }

  handleClick(event) {
    event.preventDefault();
    if (this.state.searchValue) {
      this.props.searchFunc(this.state.searchValue);
    }
  }

  render() {
    return (
      <div>
        <h4> Retrieve recommendations: </h4>
        <form>
          <input type="text" name="search" onChange={this.handleChange}/>
          <input type="submit" name="search-submit" onClick={this.handleClick}/><br/>
        </form>
      </div>
    );
  }
}

export default Search;
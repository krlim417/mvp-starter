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
      <div className="search">
        <form>
          <div className="form-group row">
            <div className="col-xs-4">
              <label htmlFor="search" className="search-label">Retrieve recommendations:</label>
              <input type="text" name="search" onChange={this.handleChange} className="form-control" />
              <input type="submit" name="search-submit" onClick={this.handleClick} className="glyphicon glyphicon-search" className="btn btn-default" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Search;
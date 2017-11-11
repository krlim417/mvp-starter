import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import List from './components/List.jsx';
// import config from '../config.js';
import Search from './components/Search.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      query: ''
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  // send(url) {
  //   $.ajax({
  //     type: "POST",
  //     url: "/",

  //   })
  // }

  search(searchValue) {
    this.setState({
      query: searchValue
    }, () => {
      console.log('HELLO', this.state.query)
    });
  }

  render () {
    return (<div>
      <h1>Guideify</h1>
      <Search searchFunc={this.search} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
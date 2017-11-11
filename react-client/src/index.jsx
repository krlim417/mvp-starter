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
      recommendations: []
    }
    this.search = this.search.bind(this);
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: '/search',
  //     data: this.
  //     success: (data) => {
  //       console.log('GET request is SUCCESSFUL.');
  //     },
  //     error: (err) => {
  //       console.log('GET request is unsuccessful.');
  //     }
  //   });
  // }

  search(value) {
    $.ajax({
      type: 'POST',
      url: '/search',
      data: {
        valueToFetch: value
      },
      success: (data) => {
        console.log('GET request is SUCCESSFUL.');
        console.log('GET DATA BACK: ', data);
      },
      error: (err) => {
        console.log('GET request is unsuccessful.');
      }
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
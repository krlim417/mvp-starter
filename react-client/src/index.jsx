import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RecommendationList from './components/RecommendationList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      recommendations: []
    }
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: '/fetch',
      success: (data) => {
        console.log('GET request is successful.');
      },
      error: (err) => {
        console.log('GET request is unsuccessful.');
      }
    });
  }

  search(value) {
    $.ajax({
      type: 'POST',
      url: '/search',
      data: {
        valueToFetch: value
      },
      success: (data) => {
        console.log('POST request is successful.');
      },
      error: (err) => {
        console.log('POST request is unsuccessful.');
      }
    }).then(data => {
      this.setState({
        recommendations: data
      });
    });
  }


  render () {
    return (<div>
      <h1>Guideify</h1>
      <Search searchFunc={this.search} />
      <RecommendationList recommendations={this.state.recommendations} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
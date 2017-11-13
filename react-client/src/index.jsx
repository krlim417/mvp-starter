import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import TopFiveLiked from './components/TopFiveSearched.jsx';
import RecommendationList from './components/RecommendationList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topFiveLiked: [],
      recommendations: []
    }
    this.fetchTopFive = this.fetchTopFive.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    this.fetchTopFive();
  }

  fetchTopFive() {
    $.ajax({
      type: 'GET',
      url: '/fetch',
      success: (data) => {
        console.log('GET request was successful.');
      },
      error: (err) => {
        console.log('GET request was unsuccessful.');
      }
    }).then(data => {
      this.setState({
        topFiveLiked: data
      });
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
        console.log('POST request was successful.');
      },
      error: () => {
        console.log('POST request was unsuccessful.');
      }
    }).then(data => {
      this.setState({
        recommendations: data
      });
    }).then(() => {
      this.fetchTopFive();
    });
  }

  render () {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="logo">Guideify</h1>
          <p>Providing recommendations for your favorite tv shows</p> 
        </div>
        <div>
          <Search searchFunc={this.search} /><br/>
          <TopFiveLiked top={this.state.topFiveLiked} />
          <RecommendationList recommendations={this.state.recommendations} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
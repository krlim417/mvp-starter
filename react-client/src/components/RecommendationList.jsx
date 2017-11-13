import React from 'react';
import RecommendationListEntry from './RecommendationListEntry.jsx';

const RecommendationList = (props) => (
  <div>
    <h5 style={{'marginLeft': 30, 'marginTop': 50}}>List of recommendations based on your search:</h5>
    <RecommendationListEntry items={props.recommendations} />
  </div>
);

export default RecommendationList;
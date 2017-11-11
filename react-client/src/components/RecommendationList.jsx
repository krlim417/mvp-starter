import React from 'react';
import RecommendationListEntry from './RecommendationListEntry.jsx';

const RecommendationList = (props) => (
  <div>
    <h4>List of recommendations based on your search:</h4>
    <RecommendationListEntry items={props.recommendations} />
  </div>
);

export default RecommendationList;
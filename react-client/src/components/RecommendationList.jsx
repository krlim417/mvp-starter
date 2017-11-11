import React from 'react';
import RecommendationListEntry from './RecommendationListEntry.jsx';

const RecommendationList = (props) => (
  <div>
  {console.log('RECCOMENDATIONS: ', props.recommendations)}
    <h4>List of recommendations based on your search:</h4>
      {props.recommendations.map(item => {
        return <RecommendationListEntry item={item} />
      })}
  </div>
);

export default RecommendationList;
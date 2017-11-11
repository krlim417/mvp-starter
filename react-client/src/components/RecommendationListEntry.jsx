import React from 'react';

const RecommendationListEntry = (props) => (
  <div className={props.item.split(' ').join('')}>
    {props.item}
    <form>
      <input type='button' value='like' className={props.item.split(' ').join('') + '-button'} />
    </form>
  </div>
);

export default RecommendationListEntry;
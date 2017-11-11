import React from 'react';

const RecommendationListEntry = (props) => (
  <div className='{props.item}'>
    {props.item}
    <form>
      <input type='button' value='like' className='{props.item}-button' />
    </form>
  </div>
);

export default RecommendationListEntry;
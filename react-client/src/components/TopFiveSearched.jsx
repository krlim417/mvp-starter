import React from 'react';

const TopFiveLiked = (props) => (
  <div style={{'marginLeft': 0}} className="container">
    <div className="row">
      {props.top.map((item, index) => {
        return (
          <div style={{'marginLeft': 35}} className="col-sm-2">
            <h5 className="text-center">{item.name}</h5>
            <h6 className="text-center">Times Searched: {item.timesSearched}</h6>
            <img src={item.image} className="img-thumbnail"></img>
          </div>
        );
      })}
    </div>
  </div>
);

export default TopFiveLiked;
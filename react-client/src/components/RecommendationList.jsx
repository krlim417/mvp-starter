import React from 'react'

const RecommendationList = (props) => (
  <div>
  {console.log('RECCOMENDATIONS: ', props.recommendations)}
    <h4>List of recommendations based on your search:</h4>
    <table>
      <tbody>
        {props.recommendations.map(item => {
          return (
            <tr>
              <td key={item}>{item}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default RecommendationList;
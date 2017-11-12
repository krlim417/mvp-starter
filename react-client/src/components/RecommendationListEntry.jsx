import React from 'react';

const RecommendationListEntry = (props) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Likes</th>
          <th></th>
        </tr>
        {props.items.map(item => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.likes}</td>
              <td>
                <form>
                  <input type='button' value='like' />
                </form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default RecommendationListEntry;
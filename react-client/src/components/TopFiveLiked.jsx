import React from 'react';

const TopFiveLiked = (props) => (
  <div>
    <h4>The top liked in the database:</h4>
    {console.log(props.top)}
    <table>
      <tbody>
        <tr>
        {props.top.map(item => {
          return (
            <td>
              <tr>
                <td>{item.name}</td>
                <td>{item.likes}</td>
              </tr>
              <tr>
                <td colSpan="2">image here</td>
              </tr>
            </td>
          );
        })}
        </tr>
      </tbody>
    </table>
  </div>
);

export default TopFiveLiked;
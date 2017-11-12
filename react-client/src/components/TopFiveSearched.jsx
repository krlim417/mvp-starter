import React from 'react';

const TopFiveLiked = (props) => (
  <div>
    <h4>The top searched shows for recommendations:</h4>
    <table>
      <tbody>
        <tr>
        {props.top.map(item => {
          return (
            <td>
              <table>
                <tbody>
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.timesSearched}</td>
                  </tr>
                  <tr>
                    <td colSpan="2"><img src={item.image}/></td>
                  </tr>
                </tbody>
              </table>
            </td>
          );
        })}
        </tr>
      </tbody>
    </table>
  </div>
);

export default TopFiveLiked;
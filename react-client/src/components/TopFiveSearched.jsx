import React from 'react';

const TopFiveLiked = (props) => (
  <div className='top-table'>
    <h4 className="top-heading">The top searched shows for recommendations:</h4>
    <table>
      <tbody>
        <tr>
        {props.top.map(item => {
          return (
            <td>
              <table>
                <tbody>
                  <tr className="top-item-name">{item.name}</tr>
                  <tr clasName="top-search-item">Times searched: {item.timesSearched}</tr>
                  <tr>
                    <td colSpan="2"><img src={item.image} className="img-thumbnail" /></td>
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
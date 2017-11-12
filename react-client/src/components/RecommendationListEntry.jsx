import React from 'react';

class RecommendationListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log('EVENT: ', event.target.value);
  }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Likes</th>
              <th></th>
            </tr>
            {this.props.items.map(item => {
              return (
                <tr>
                  <td className='item-name' key={item.name}>{item.name}</td>
                  <td>{item.likes}</td>
                  <td><button type='button' value={item.name} onClick={this.handleClick}>Like</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
  }
};

export default RecommendationListEntry;
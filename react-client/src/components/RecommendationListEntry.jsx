import React from 'react';

class RecommendationListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    {console.log(this.props.items)}
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th></th>
            </tr>
            {this.props.items.map(item => {
              return (
                <tr>
                  <td className='item-name' key={item.name}>{item.name}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr>{item.description}</tr>
                        <tr>Read More: <a href={item.wiki}>{item.wiki}</a></tr>
                      </tbody>
                    </table>
                  </td>
                  <td><iframe src={`https://www.youtube.com/embed/${item.youtubeId}`}></iframe></td>
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
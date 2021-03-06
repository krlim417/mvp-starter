import React from 'react';

class RecommendationListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

  }

  render() {
    return (
      <div className="container-fluid">
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Trailer</th>
            </tr>
            {this.props.items.map(item => {
              return (
                <tr>
                  <td className="item-name" key={item.name}>{item.name}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr className="list-desc">{item.description}</tr>
                        <tr className="wiki">Read More: <a href={item.wiki}>{item.wiki}</a></tr>
                      </tbody>
                    </table>
                  </td>
                  <td><iframe src={`https://www.youtube.com/embed/${item.youtubeId}`} frameBorder="0" allowFullScreen></iframe></td>
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
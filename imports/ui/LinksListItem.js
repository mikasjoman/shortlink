import React, { Component } from 'react';
import Clipboard from 'clipboard';
import { Meteor } from 'meteor/meteor';
import { Links } from '../api/Links';
import moment from 'moment';

export default class LinksListItem extends Component {

  constructor(props){
    super(props);
    this.state = {
      justCopiedTitle: false
    };
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', ()=>{

      this.setState({ justCopiedTitle: true });

      setTimeout(()=> {
        this.setState({ justCopiedTitle: false });
      }, 1000);

    }).on('error', ()=> {
      alert('unable to copy');
    });
  }

  componentWillUnmount() {
      //clean up
      this.clipboard.destroy();
  }

  renderStats(visitedCount, lastVisited) {
    const visitMessage = visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if(typeof lastVisited === 'number'){
      visitedMessage = `(visited ${moment(lastVisited).fromNow()})`
    }
    return (
      <p>
        {visitedCount} {visitMessage} { visitedMessage}-
        {lastVisited}
      </p>
    );
  }


  render() {
    const {shortUrl, key, visible, url, visitedCount, lastVisited } = this.props;
    return (
      <div key={key} className="item">
        <a href={shortUrl} target="_blank" className="button button--link button--pill">Visit!</a>
        <h2>{url}</h2>
        {this.renderStats(visitedCount, lastVisited)}
        <button className="button button--pill" ref="copy" data-clipboard-text={shortUrl}>
          {this.state.justCopiedTitle ? 'Copied' : 'Copy' }
        </button>
        <button className="button button--pill" onClick={() => {
          const { _id, visible } = this.props;
          Meteor.call('links.setVisibility', _id, !visible);

        }} >
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  shortUrl: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  _id: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  visitedCount: React.PropTypes.number.isRequired,
  lastVisited: React.PropTypes.number
}

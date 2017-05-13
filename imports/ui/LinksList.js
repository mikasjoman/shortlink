import React, { Component } from 'react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

import {Links} from '../api/Links';
import LinksListItem from './LinksListItem';

export default class LinksList extends Component {

  constructor(props){
    super(props);
    this.state ={
      links: []
    };
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(()=> {
      Meteor.subscribe('links');
      let searchQuery = { visible: Session.get('showVisible') };
      const links = Links.find(searchQuery).fetch();
      this.setState({ links });
    });
  }

  componentWillUnmount() {
    this.linksTracker.stop();// stops the tracker to take resources
  }

  renderLinksListItems(){
    if(this.state.links.length < 1){
      return <div className="item item__message"><p className="item__status-message">No links found...</p></div>
    }
    return this.state.links.map((link) => {
      let { url, _id } = link;
      // observe that the spread operator places them out
      const shortUrl = Meteor.absoluteUrl(_id);
      return <LinksListItem key={_id} shortUrl={shortUrl} {...link} />;
    })
  }

  render() {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}

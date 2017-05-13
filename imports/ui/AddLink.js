import React, { Component } from 'react';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import { Links } from '../api/Links';

const INITAL_STATE = {
  url: '',
  isOpen: false,
  error: ''
}

export default class AddLink extends Component {


  constructor(props) {
    super(props);
    this.state = INITAL_STATE;
  }
  onSubmit(e){
    e.preventDefault();
    const { url } = this.state;

    Meteor.call('links.insert', url, (err,res)=>{
      if(!err){
        this.setState({...INITAL_STATE});
      }else{
        this.setState({ error: err.reason })
      }
    });

  }

  onChange(event){
      this.setState({url: event.target.value});
  }


  renderForm(){
    return (
      <p>
        <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
          <input
            type="text"
            placeholder="URL"
            value={this.state.url}
            onChange={this.onChange.bind(this)}
            ref="url"
          />
          <button className="button">Add Link</button>
          <button
            type="button"
            className="button button--link button-secondary"
            onClick={()=> this.setState({...INITAL_STATE})}
            >
              Close
          </button>
        </form>

      </p>
      );
  }
  renderErrorMsg() {
    const { error } = this.state;
    return error === '' ? '' : <p>{error}</p>;
  }

  render() {
    return (
      <div>
        <button className="button" onClick={()=> this.setState({isOpen: true})}> + Add link </button>
        <Modal
          onRequestClose={()=> this.setState({...INITAL_STATE})}
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={()=>this.refs.url.focus()}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add link</h1>
          {this.renderErrorMsg()}
          {this.renderForm()}
        </Modal>
      </div>
    );
  }
}

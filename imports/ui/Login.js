
import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(event){
    event.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    console.log('running...');
    Meteor.loginWithPassword({email}, password, (error)=> {
      if(error){
        console.log('Login callback,', error);
        this.setState({ error: error.reason});
      }else{
        this.setState({error: ''});
      }
    });
  }

  render() {
    let { error } = this.state;
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Link</h1>
          <h5>{error ? <p>{error}</p> : null}</h5>
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button" type="submit">Login to account</button>
          </form>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    )
  }
}

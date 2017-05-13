
import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {

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

    if(password.length < 9){
      return this.setState({error: 'password must be more than 8 chaachters long'});
    }

    Accounts.createUser({email, password}, (err)=>{

      if(err){
        console.log('Signup callback, ', err);
        this.setState({ error: err.reason});
      }else{
        this.setState({error:''});
      }
    });
  }

  render() {
    let { error } = this.state;
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup component</h1>
          <h5>{error ? <p>{error}</p> : null}</h5>
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button" type="submit">Create account</button>
          </form>
          <Link to="/">Already have an account?</Link>
        </div>
      </div>

    )
  }
}

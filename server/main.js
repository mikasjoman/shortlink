import { Meteor } from 'meteor/meteor';
import '../imports/api/users'; // executes directly
import { WebApp } from 'meteor/webapp';
import moment from 'moment';


import { Links } from '../imports/api/Links';
import '../imports/startup/simple-schema-configuration';

Meteor.startup(() => {

  let momentNow = moment(0);
  console.log(momentNow.fromNow());

// middleware to send a person to the link url
  WebApp.connectHandlers.use((req,res, next)=> {

    const _id = req.url.slice(1);
    /// below returns one document or undefined
    const link = Links.findOne({ _id });
    // now you dont need to check the lenght of the returned array

    if(link){

      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      console.log('running trackVisit');
      Meteor.call('links.trackVisit', _id);
    }
    next();
  })

});

// WebApp.connectHandlers.use((req,resp, next)=>{
//   console.log('hello from custom middle ware');
//   console.log(req.url, req.method, req.headers, req.query);
//   // is used to teach the webserver to do something new
//   // http://www.httpstatuses.com
//   // resp.statusCode = 404;
//   // resp.setHeader('my-customHeader', 'Mikael');
//   // // resp.write('<h1>Middleware </h1>');
//   // resp.end(); // completely takes over the server
//   next();
// });

  // code to run on server at startup
  // const petSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200,
  //     optional: true
  //   },
  //   age: {
  //     type: Number,
  //     min: 0
  //   },
  //   contactNumber: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Phone
  //   }
  // });
  //
  // petSchema.validate({
  //   age: 1,
  //   contactNumber: '444'
  // });
  //
  // const employeeSchema = new SimpleSchema({
  //   name: {
  //     type: String,
  //     min: 1,
  //     max: 200
  //   },
  //   hourlyWage: {
  //     type: Number,
  //     min: 0,
  //     optional: true
  //   },
  //   email: {
  //     type: String,
  //     optional: true,
  //     regEx: SimpleSchema.RegEx.Email
  //   }
  // });
  //
  // employeeSchema.validate({
  //   name:'Mikae',
  //   email: 'mika@'
  // })

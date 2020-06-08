import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function App() {
  const [people, updatePeople] = useState([]);
  async function callApi() {
    try {
      const peopleData = await API.get('mainappapi', '/people');
      updatePeople(peopleData.people);
      console.log('people Data: ', peopleData);

      const userData = await API.get('mainappapi', '/users');
      console.log('User Data: ', userData);
    } catch (err) {
      console.log({ err });
    }
  }
  useEffect(() => {
    callApi();
  }, []);
  return (
    <div className="App">
      <h1>Hello Serverless Amplify Application</h1>
      <h2>Working with lambda and API Gateway</h2>
      {people.map((p, i) => (
        <h4>{p.name}</h4>
      ))}
    </div>
  );
}

export default withAuthenticator(App);
//export default App;

import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Owners from './owners';

const App = ()=> {

  const [owners,setOwners]=useState([]);
  const [antiques,setAntiques] =useState([]);

  //fetch list of owners
  useEffect(()=>{
    //get data from postgreSQL
    const fetchOwners= async ()=>{
       const response = await axios.get('/api/owners')
       console.log(response);

       //update state
       setOwners(response.data);
    }
    fetchOwners();

  },[])

  return (
    <div>
      <h1>Hello World</h1>
       <h3>Owners - {owners.length}</h3>
       <h4>test!!</h4>
      <Owners owners={owners}></Owners>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);

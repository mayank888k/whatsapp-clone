
import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebaar from './Sidebaar';
import Pusher from 'pusher-js'
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom'
import Login from './Login';
import { useStateValue } from './StateProvider';


function App() {

  // const [user,setUsr] = useState("Hello")
  const [{user},dispatch] = useStateValue()
  console.log(user)

  const { roomId } = useParams()
  useEffect(() => {
    console.log(roomId)
  }, [])
  

  

 
  return (
    <div className="app">

      {!user ? (<Login></Login>) : (
        <>
          <div className="app_body">
            <Sidebaar />
            <Switch>
              {/* <Route exat path="/" component={Sidebaar} /> */}
              <Route exat path="/rooms/:roomId">
                <Chat />
              </Route>

            </Switch>
          </div>
        </>)
      }
    </div>
  );
}

export default App;

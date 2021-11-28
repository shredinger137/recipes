import './App.css';
import List from './components/List'
import SinglePost from './pages/SinglePost';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './assets/bootstrap.min.css'
import './assets/styles.css'
import Header from './components/Header';

const client = require("contentful").createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  accessToken: process.env.REACT_APP_CONTENTFUL_KEY
});


function App() {


  return (
    <div className="App">
              <Header />
      <div className="content" style={{ width: "80vw", margin: "0 auto" }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<List client={client} />} />
            <Route path="/recipes/*" element={<SinglePost client={client} />} />
          </Routes>

        </Router>
      </div>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Pre from './components/presentation/Pre';
import Face from './components/main/Face';
import { useEffect, useState } from 'react';



function App() {

  useEffect(() => {
    setTimeout(() => {
      setP(false)
    }, 5000);
  }, [])
  const [p, setP] = useState(true)


  return (
    <div >
      <div className="container">

        {
          p ? (<Pre />) : (<Face />)
        }
      </div>



    </div>
  );
}

export default App;

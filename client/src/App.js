import './App.css';
import { Button } from '@mui/material';
import { purple } from '@mui/material/colors';
function App() {
  console.log(purple);
  return (
    <div className='App'>
      <h1> Hello world</h1>
      <Button color='primary' variant='contained'>
        {' '}
        Hello World
      </Button>
    </div>
  );
}

export default App;

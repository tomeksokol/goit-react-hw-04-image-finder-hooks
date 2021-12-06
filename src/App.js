import './App.css';
import Searchbar from './components/searchbar/Searchbar';
import ImageGallery from './components/imageGallery/ImageGallery';
import Button from './components/button/Button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Searchbar />
        <ImageGallery />
        <Button />
      </header>
    </div>
  );
}

export default App;

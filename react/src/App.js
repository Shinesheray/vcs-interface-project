import "./css/App.css";
import Home from "./components/Home";

function App() {
  return (
    // Main App
    <div className="App">
      {/* Heading/title */}
      <div className="heading">
        <h1>Search for a user on any VCS</h1>
      </div>
      {/* Home componant called */}
      <Home />
    </div>
  );
}

export default App;

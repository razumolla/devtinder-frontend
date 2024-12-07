import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />

      <div data-theme="dark">
        This div will always use light theme
        <span data-theme="retro">This span will always use retro theme!</span>
      </div>
    </>
  );
}

export default App;

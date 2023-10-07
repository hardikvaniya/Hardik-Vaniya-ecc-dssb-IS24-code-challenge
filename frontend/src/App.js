import React from 'react';
import Home from './pages/Home/Home'; // Import the Home component from the directory

function App() {
  return (
    <div>
      <header>
        <h1>My React App</h1>
      </header>
      <main>
        <Home />
        {/* Other components and routes */}
      </main>
    </div>
  );
}

export default App;

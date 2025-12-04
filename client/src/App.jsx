import { useState } from 'react';
import './App.css'

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
     <div className="min-h-screen" data-theme={theme}>
      hey
     </div>
    </>
  )
}

export default App

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StockFeature from './features/StockFeature'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StockFeature />
      <p className="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
    </>
  )
}

export default App

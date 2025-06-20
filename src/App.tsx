import "./App.css";

import { useState } from "react";

import { selectApp } from "@/store/selectors/appSelectors";
import { toggleDarkMode } from "@/store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@/store/utils";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector(selectApp);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank"></a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => dispatch(toggleDarkMode())}>
        {darkMode ? "Dark" : "Light"}
      </button>
    </>
  );
}

export default App;

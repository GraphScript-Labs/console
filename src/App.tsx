import { AppWindow } from "./components/AppWindow";
import { Console } from "./components/Console";

export function App() {
  return (<>
    <div className="app">
      <AppWindow>
        <Console />
      </AppWindow>
    </div>
  </>);
}


import { useCallback, useEffect, useState } from "react";
import { TerminalInput } from "../TerminalInput";
import "./style.css";

export function Console() {
  const [outputs, setOutputs] = useState<string[]>([]);
  const [running, setRunning] = useState(true);

  const addMessage = useCallback((msg: string) => {
    setOutputs((prev) => [...prev, msg]);
  }, []);

  const acknowledgeFinished = useCallback(() => {
    setRunning(false);
  }, []);

  useEffect(() => {
    window.connectConsole(addMessage, acknowledgeFinished);
  }, [addMessage, acknowledgeFinished]);

  return (<>
    <div id="console" className="console">
      <div className="console-lines">
        {
          outputs.map((msg, index) => (
            <div key={index} className="console-line">
              {msg}
            </div>
          ))
        }
      </div>

      {!running && (
        <div className="finished-line">
          Script finished
        </div>
      )}

      <TerminalInput running={running} />
    </div>
  </>);
}


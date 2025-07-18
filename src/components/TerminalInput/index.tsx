import { CornerDownLeft } from "lucide-react";
import { useCallback, useRef } from "react";
import { pushInput } from "../../utils/desktopTools";

import "./style.css";

export function TerminalInput({
  running,
}: {
  running?: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const sendInput = useCallback(async () => {
    if (!running) return;
    if (!inputRef.current) return;
    const input = inputRef.current.value.trim();
    if (!input) return;

    await pushInput(input);
    inputRef.current.value = "";
  }, [running]);

  return (<>
    <div className="terminal-input">
      <input
        disabled={!running}
        ref={inputRef}
        className="terminal-input-box"
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            sendInput();
          }
        }}
        type="text"
        value={running ? undefined : ""}
      />
      
      <button
        className="terminal-button"
        onClick={sendInput}
        disabled={!running}
      >
        <CornerDownLeft />
      </button>
    </div>
  </>);
}


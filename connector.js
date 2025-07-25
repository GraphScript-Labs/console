window.consoleMessages = [];
window.pushOutputCallback = null;
window.finishedCallback = null;

window.pushConsoleOutput = (msg) => {
  window.consoleMessages.push(msg);
  pushOutputCallback?.(msg);
};

window.emitFinished = () => {
  window.finishedCallback?.();
}

window.connectConsole = (
  pushOutputCallback,
  acknowledgeFinishedCallback,
) => {
  window.pushOutputCallback = pushOutputCallback;
  window.finishedCallback = acknowledgeFinishedCallback;
  window.consoleMessages.forEach((msg) => pushOutputCallback(msg));
};



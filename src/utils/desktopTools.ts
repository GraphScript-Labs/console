import type { PyWebview } from "../defs/PyWebview";

const setupDesktopTools = () => {
  const getApi = (): PyWebview["api"] | undefined => {
    return window.pywebview?.api;
  };

  const checkApiState = (): boolean => {
    return !!Object.keys(getApi() || {}).length;
  };

  const waitForPWV = (): Promise<void> => {
    return (new Promise((resolve) => {
      if (checkApiState()) {
        resolve();
        return;
      }

      const checkInterval = setInterval(() => {
        if (checkApiState()) {
          resolve();
          clearInterval(checkInterval);
        }
      }, 10);
    }));
  }

  const closeWindow = async () => {
    await waitForPWV();
    return getApi()?.close();
  }

  const pushInput = async (input: string) => {
    await waitForPWV();
    return getApi()?.push_input(input);
  }

  return {
    closeWindow,
    pushInput,
  }
};

export const {
  closeWindow,
  pushInput,
} = setupDesktopTools();


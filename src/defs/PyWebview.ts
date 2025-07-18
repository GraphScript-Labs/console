export interface PyWebview {
  api: {
    close: () => Promise<void>;
    push_input: (input: string) => Promise<void>;
  }
};


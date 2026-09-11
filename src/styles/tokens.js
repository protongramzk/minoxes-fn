import { css } from 'lit';

export const tokenStyles = css`
  :host {
    --bg: #111318; --surface: #191c20; --surf-low: #212429; --surf-hi: #2b2e33;
    --primary: #efa770; --on-primary: #551700; --p-container: #00468a; --on-p-container: #d6e3ff;
    --error: #ffb4ab; --on-error: #690005; --text: #e2e2e9; --text-sec: #c4c6d0; --outline: #44474f;
    --radius-s: 8px; --radius-m: 16px; --radius-l: 28px;
  }

  :host-context([data-theme="light"]),
  [data-theme="light"] {
    --bg: #f8f9ff; --surface: #f2f3f9; --surf-low: #eaebf1; --surf-hi: #e2e2e9;
    --primary: #ff8b20; --on-primary: #ffffff; --p-container: #d6e3ff; --on-p-container: #001b3e;
    --error: #ba1a1a; --on-error: #ffffff; --text: #191c20; --text-sec: #44474f; --outline: #74777f;
  }
`;

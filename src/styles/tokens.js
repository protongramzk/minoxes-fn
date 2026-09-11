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

  :host-context([data-theme="nord"]), [data-theme="nord"] {
    --bg: #2e3440; --surface: #3b4252; --surf-low: #434c5e; --surf-hi: #4c566a;
    --primary: #88c0d0; --on-primary: #2e3440; --p-container: #5e81ac; --on-p-container: #eceff4;
    --text: #eceff4; --text-sec: #d8dee9; --outline: #616e85;
  }

  :host-context([data-theme="orange-dark"]), [data-theme="orange-dark"] {
    --bg: #211713; --surface: #302019; --surf-low: #42291e; --surf-hi: #563628;
    --primary: #ffb77d; --on-primary: #351000; --p-container: #7d3f20; --on-p-container: #ffdcc7;
    --text: #ffede5; --text-sec: #e9cfc3; --outline: #896d60;
  }

  :host-context([data-theme="violet-dark"]), [data-theme="violet-dark"] {
    --bg: #1d1725; --surface: #2b2136; --surf-low: #392b47; --surf-hi: #493858;
    --primary: #d9b8ff; --on-primary: #35115c; --p-container: #593c79; --on-p-container: #f0dcff;
    --text: #f7edff; --text-sec: #d9c8e3; --outline: #776582;
  }

  :host-context([data-theme="emerald-dark"]), [data-theme="emerald-dark"] {
    --bg: #101b18; --surface: #172823; --surf-low: #20372f; --surf-hi: #2b443a;
    --primary: #78ddb4; --on-primary: #003829; --p-container: #07533e; --on-p-container: #9bf5ce;
    --text: #dcf7e9; --text-sec: #b8d9ca; --outline: #587267;
  }
`;

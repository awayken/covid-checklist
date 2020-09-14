import { css } from 'lit-element';

export const button = css`
  button {
    appearance: none;
    background: var(--primary-darker);
    border: 2px solid #000;
    border-radius: 4px / 6px;
    box-sizing: border-box;
    color: #fff;
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    padding: 4px 6px;
  }

  button[type='submit'] {
    display: flex;
    justify-content: flex-end;
    margin: 0.5rem 0 0 auto;
  }

  button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const p = css`
  p {
    margin: 0 0 0.5rem 0;
  }
`;

export const input = css`
  input {
    box-sizing: border-box;
    border: 2px solid var(--primary-darker);
    border-radius: 4px / 6px;
    display: block;
    font-family: inherit;
    font-size: inherit;
    padding: 4px;
  }
`;

export const label = css`
  label {
    cursor: pointer;
    display: block;
    margin: 0 0 0.5rem 0;
  }
`;

export const visuallyHidden = css`
  .hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    /* position: absolute; */
    white-space: nowrap;
    width: 1px;
  }
`;

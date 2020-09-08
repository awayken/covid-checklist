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
       `;

export const p = css`
         p {
           margin: 0 0 0.5rem 0;
         }
       `;

export const h1 = css`
         h1 {
           font-family: var(--headline-family);
           font-size: var(--headline-size);
           font-weight: var(--headline-weight);
           line-height: 1.3;
           margin: 0 0 0.5rem 0;
           padding: 0;
         }

         h1 label {
           display: block;
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
           display: block;
           margin: 0 0 0.5rem 0;
         }
       `;

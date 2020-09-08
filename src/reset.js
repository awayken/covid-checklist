import { css } from 'lit-element';

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

import '../components/AppPage.js';

export default {
  title: 'App Components/AppPage',
  component: 'app-page',
  decorators: [
    Story =>
      `<div style="background: #eee; height: 90vh;">
        ${Story()}
      </div>`,
  ],
};

export const renders = () => `<app-page><p>Page content.</p></app-page>`;

export const rendersAFooter = () =>
  `<app-page><p>Page content.</p> <p slot="footer">Footer content.</p></app-page>`;

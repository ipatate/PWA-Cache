import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import 'worker-loader?name=service-worker.js!./service-worker.js'; // eslint-disable-line
import reset from './styles/reset'; // eslint-disable-line
import theme from './styles/theme';

const App = () => <div>App React</div>;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

if ('serviceWorker' in navigator) {
  console.log('Okay cool, this browser supports Service Workers.'); // eslint-disable-line
  navigator.serviceWorker.register('./service-worker.js').catch(error => {
    console.log('Something went terribly wrong! 😬', error); // eslint-disable-line
  });
}

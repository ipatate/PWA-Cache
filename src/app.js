import React from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>App React</div>;

ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept();
}

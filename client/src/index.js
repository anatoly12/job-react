import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

/* * Utils * */
import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'
import store from './store'
import RedBox from 'redbox-react'

/* * Components * */
import App from './components/App'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

// Analytics Tracking
const script = document.createElement('script');
script.src = "http://localhost:3000/analytics.js?key=7dc9265c-deb8-4a87-b064-1665b3b965d9";
script.async = true;
document.body.appendChild(script);

const consoleErrorReporter = ({error}) => {
  console.error(error)
  return <RedBox error={error} />
}

consoleErrorReporter.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired
}

/* * wrapping App.js in Proivder component to allow access to our redux store * */
const render = function (Component) {
  ReactDOM.render(
    <AppContainer errorReporter={consoleErrorReporter}>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const hotApp = require('./components/App.js').default
    render(hotApp)
  })
}

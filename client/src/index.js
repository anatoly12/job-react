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

const ANALYTICS_SCRIPT_SRC = 'https://b15d-203-99-183-113.ngrok-free.app/analytics.js?key=d6feea11-8058-43f7-90a5-d30584f52a52'

const loadAnalyticsScript = () => {
  if (typeof document === 'undefined') {
    return
  }
  if (document.querySelector(`script[src="${ANALYTICS_SCRIPT_SRC}"]`)) {
    return
  }
  const script = document.createElement('script')
  script.async = true
  script.src = ANALYTICS_SCRIPT_SRC
  document.head.appendChild(script)
}

loadAnalyticsScript()

injectTapEventPlugin()

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

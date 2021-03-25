import 'bootstrap/dist/css/bootstrap.css'
import {Provider} from 'react-redux'
import {store} from './configure-store'

function MyApp({ Component, pageProps }) {
  return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  )
}

export default MyApp

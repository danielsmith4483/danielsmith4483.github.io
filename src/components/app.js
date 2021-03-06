import { h, Component } from 'preact';
import { Router } from 'preact-router';
import Helmet from 'preact-helmet';

import Home from '../routes/home';
// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (module.hot) {
	require('preact/debug');
}

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app">
				<Helmet
					title="Daniel Smith"
					meta={[
						{ name: 'description', content: 'I\'m Daniel, a software engineer with a background in Computer Science. I\'m passionate about delivering a good user experience, optimization, and web development.' },
						{ property: 'og:type', content: 'article' },
						{ property: 'og:site_name', content: 'danielsmith.io' },
						{ property: 'og:description', content: 'I\'m Daniel, a software engineer with a background in Computer Science. I\'m passionate about delivering a good user experience, optimization, and web development.' },
						{ property: 'og:image', content: 'https://storage.googleapis.com/danielsmith/photo.png' },
						{ property: 'og:url', content: 'https://danielsmith.io' },
						{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
						{ name: 'keywords', content: 'danielsmith4483, Daniel Smith, software engineer, computer scientist' }
					]}
				/>
				<Router onChange={this.handleRoute}>
					<Home path="/" />
				</Router>
			</div>
		);
	}
}

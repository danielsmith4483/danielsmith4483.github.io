import { h, Component } from 'preact';
import './style';

import linkData from './links.json';

import SocialLink from '../../Components/SocialLink';

export default class LinksContainer extends Component {
	render() {
		return (
			<div className="linksContainer">
				{linkData.map(l => <SocialLink url={l.url} title={l.title} thumbnail={l.thumbnail} />)}
			</div>
		);
	}
}

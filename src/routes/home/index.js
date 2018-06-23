import { h, Component } from 'preact';
import style from './style';

import CardsContainer from '../../Containers/CardsContainer';
import LinksContainer from '../../Containers/LinksContainer';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<div class={style.parallax} />
				<div class={style.contents}>
					<LinksContainer />
					<CardsContainer />
				</div>
			</div>
		);
	}
}

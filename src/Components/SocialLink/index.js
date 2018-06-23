import { h, Component } from 'preact';
import './style';

export default class SocialLink extends Component {
	render() {
    const imgStyle = {
    }
		return (
			<span className="socialLink">
				<a href={this.props.url} target="_blank">
					<img src={this.props.thumbnail} style={imgStyle} /> <span>{this.props.title}</span>
				</a>
			</span>
		);
	}
}

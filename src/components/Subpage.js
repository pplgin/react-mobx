import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Match, Link } from 'react-router-dom'


@inject('store') @DataW @observer
export default class SubPage extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store
	}
	componentDidMount() {
		let pathname = this.props.match.url
		let id = this.props.match.id ? this.props.match.id : null
		this.store.fetchData(pathname, id)
	}
	componentWillUnmount() {
		this.store.clearItems();
	}
	render() {
		return (
			<div className="page posts">
				<h1>Posts</h1>
				<p className="subheader">Posts are fetched from jsonplaceholder.typicode.com</p>
				<hr />
				<ul>
					{this.store.items && this.store.items.length ? this.store.items.slice(1,10).map(post => {
						return <li key={post.id}>
						<Link to={`${this.props.match.path}/${post.id}`}>
						<h1>{post.title}</h1>
						</Link>
						<p>{post.body.substring(0, 120)}</p>
						</li>
					}) : 'Loading...'}
				</ul>
			</div>
		)
	}
}


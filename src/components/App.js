import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'
import DevTools from 'mobx-react-devtools'

@observer
export default class App extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store
	}

	render() {
		const { timeToRefresh, refreshToken } = this.store
		return (
			<Router>
				<Provider store={this.store}>
					<div className="wrapper">
						<DevTools />
						<Route
						  exact
						  path="/posts"
						  render={(props) => <LazyRoute {...props} component={import('./SubPage')} />}
						/>
						<Route
						  exact
						  path="/posts/:id"
						  render={(props) => <LazyRoute {...props} component={import('./SubItem')} />}
						/>
					</div>
				</Provider>
			</Router>
		)
	}
}

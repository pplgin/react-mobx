import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import DataWrapper from './DataWrapper'

@DataWrapper @inject("store") @observer
export default class Subitem extends Component {
	constructor(props) {
		super(props)
		this.store = this.props.store
	}
	render() {
		return (
			<div className="page post">
				<Link to="/posts">&larr; Back to Posts</Link>
				{!!this.store.item && (
					<article>
						<h1>{this.store.item.title}</h1>
						<p>{this.store.item.body}</p>
						<h3>动态数据相关</h3>
						<p>标题：{this.store.pageTitle}</p>
						<p>时间：{this.store.time}</p>
						<a onClick={()=>this.store.changeDate()}>点击修改当前时间 and 随机数</a>
					</article>
				)}

			</div>
		)
	}
}
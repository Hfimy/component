//错误处理组件

import React, { PureComponent } from 'react'

export default class ErrorBoundary extends PureComponent {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }
    componentDidCatch(err, info) {
        this.setState({ hasError: true })
        //sendErrorReport(err,info)
    }
    render(){
        if(this.state.hasError){
            return <div>Something went wrong!</div>
        }
        return this.props.children
    }
}
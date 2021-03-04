import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'mobx-react'
import Home from '@/views/pages/home/index'
import * as Store from '@/store'
// import HomePage from '@/views/pages/home-page/index'

// console.log(Store)
export default class router extends Component {
    render() {
        return (
            <Provider {...Store} >
                <Router>
                    <Switch>
                        <Route path="/" exact component={props => <Home {...props}></Home>} />
                        <Redirect from="/*" to="/" />
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

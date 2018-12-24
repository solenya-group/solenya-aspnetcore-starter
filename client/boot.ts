import 'es6-shim'
import 'whatwg-fetch'
import 'web-animations-js'
import './site.scss'
import 'bootstrap'
import { App } from 'solenya'
import { Master } from './app/master'

var app = window["app"] = new App (Master, "app")  
  
if (module.hot) 
    module.hot.accept('./app/master', () => {
        var latest = require ('./app/master')
        window["app"] = new App (latest.Master.prototype.constructor, "app", {isVdomRendered: true})
    }) 
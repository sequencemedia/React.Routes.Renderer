/* eslint promise/param-names: 0 */

import React from 'react'
import { match, RouterContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import createHistory from 'history/lib/createHistory'
import Boom from 'boom'

const ROUTER_MATCH = 'Renderer encountered an error raised by ReactRouter.match()'
const REACT_RENDER = 'Renderer caught an implemetation error in ReactDOMServer.renderToString()'

const badImplementation = (message, e) => Boom.badImplementation(message, Boom.wrap(e))
const notFound = (path) => Boom.notFound(`ReactRouter.match() cannot find ${path}`)

const history = createHistory()

/**
 * @return {String}
 */
const renderToString = (props) => ReactDOMServer.renderToString(
  <RouterContext
    {...props}
  />
)

export class Renderer {

  /**
   * @return {Promise}
   */
  render (routes, path) {
    const location = history.createLocation(path)
    return new Promise((success, failure) => {
      match({ routes, location }, (e, redirect, props) => {
        let b
        if ((b = !!e) || (!redirect && !props)) {
          return failure(
            (b)
              ? badImplementation(ROUTER_MATCH, e)
              : notFound(path)
          )
        }
        if (redirect) return success({ redirect })
        try {
          const rendered = renderToString(props)
          success({ rendered })
        } catch (e) {
          failure(badImplementation(REACT_RENDER, e))
        }
      })
    })
  }

}

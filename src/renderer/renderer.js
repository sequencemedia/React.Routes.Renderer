import React from 'react'
import { match, RouterContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import Boom from 'boom'

const ROUTER_MATCH = 'Renderer encountered an error raised by ReactRouter.match()'
const REACT_RENDER = 'Renderer caught an implementation error in ReactDOMServer.renderToString()'

const badImplementation = (e, message) => Boom.wrap(e, 500, message)
const notFound = (location) => Boom.notFound(`ReactRouter.match() cannot find ${location}`)

/**
 * @return {String}
 */
const renderToString = (props) => (
  ReactDOMServer.renderToString(
    <RouterContext
      {...props}
    />
  )
)

export class Renderer {
  /**
   * @return {Promise}
   */
  render = (routes, location) => (
    new Promise((resolve, reject) => {
      match({ routes, location }, (e, redirect, props) => {
        let b
        if ((b = !!e) || (!redirect && !props)) {
          return reject(
            (b)
              ? badImplementation(e, ROUTER_MATCH)
              : notFound(location)
          )
        }
        if (redirect) return resolve({ redirect })
        try {
          const rendered = renderToString(props)
          resolve({ rendered })
        } catch (e) {
          reject(badImplementation(e, REACT_RENDER))
        }
      })
    })
  )
}

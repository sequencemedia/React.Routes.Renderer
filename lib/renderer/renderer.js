import React from 'react'
import { match, RouterContext } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import createHistory from 'history/lib/createHistory'
import Boom from 'boom'

const history = createHistory()

export class Renderer {

  render (routes, path) {
    const location = history.createLocation(path)
    return new Promise(function (success, failure) {
      match({ routes, location }, (e, redirect, props) => {
        let b
        if ((b = !!e) || (!redirect && !props)) {
          return failure(
            (b)
              ? Boom.wrap(e)
              : Boom.notFound())
        }
        if (redirect) return success({ redirect })
        try {
          const rendered = ReactDOMServer.renderToString(
            <RouterContext
              {...props}
            />
          )
          success({ rendered })
        } catch (e) {
          return failure(e)
        }
      })
    })
  }

}

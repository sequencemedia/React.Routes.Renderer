import React from 'react';
import { match, RouterContext } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import createLocation from 'history/lib/createLocation';

export class Renderer {

	render(routes, path) {
		const location = createLocation(path);
		return new Promise(function (success, failure) {
			match({ routes, location }, (e, redirect, props) => {
				if (e || !props) return failure(e);
				if (redirect) success({ redirect });
				try {
					const rendered = ReactDOMServer.renderToString(<RouterContext {...props} />);
					success({ rendered });
				} catch (e) {
					return failure(e);
				}
			});
		});
	}

}

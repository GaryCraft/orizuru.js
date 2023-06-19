import EventEmitter from "node:events";
import { HandlerFunction, HandlerType, HANDLER_TYPE } from "./types/Handlers";
import { Request, RequestContainer } from "./types/Structures";
import { OrizuruConfig } from "./types/Configuration";
import Express from "express";

/** 
 * @class Orizuru
 * @classdesc
 * Orizuru is a class that handles all the events that are sent to the server
 * @extends EventEmitter
 * @emits 
 * Orizuru#onRequest
 * @param {unknown} context
 * The context that will be passed to the handlers, this can be anything you want
 * and it will be passed to the handlers as the first parameter
 * @example
 * const orizuru = new Orizuru(context);
 * express.post("/orizuru", orizuru.getExpressHandler());
 * 
 * orizuru.addHandler("Auth", (context, req) => {
 *  /* Your Login Verification Logic here * /
 * });
 */

class Orizuru extends EventEmitter {
	/** @hidden */
	private handlers: Map<HandlerType, HandlerFunction<unknown, HandlerType>> = new Map();
	/** @hidden */
	private options: OrizuruConfig = {
		reqAuthValidator:(_req, _res) => true
	};
	/** @hidden */
	readonly context: unknown;
	/** @hidden */
	constructor(context: unknown, options?: OrizuruConfig) {
		super();
		this.context = context;
		this.on("onRequest", this.handleRequest);
		if (options) {
			this.options = options;
		}
	}
	/** 
	 *  @description
	 *  Used to bind the Orizuru Handler to an express server
	 *  @returns {Express.RequestHandler}
	 */
	getExpressHandler(): Express.RequestHandler {
		return (req: Express.Request, res: Express.Response) => {
			if (this.options.reqAuthValidator){
				if (!this.options.reqAuthValidator(req, res)) {
					res.status(401).send("Unauthorized");
					return;
				}
			}
			this.emit("onRequest", req, res);
		}
	}
	/**
	 * @description
	 * Adds a handler to the Orizuru instance
	 * @param {HandlerType} handlerType
	 * The type of handler to add
	 * @param {HandlerFunction} handler
	 * The handler function to add
	 * @example
	 * orizuru.addHandler("Auth", (context, req) => {
	 * /* Your Login Verification Logic here * /
	 * });
	 */
	addHandler(handlerType: HandlerType, handler: HandlerFunction<any, typeof handlerType>) {
		this.handlers.set(handlerType, handler);
	}
	private async handleRequest(req: Express.Request, res: Express.Response) {
		if (!req.body) {
			res.status(400).send("Missing body");
			return;
		}
		if (!req.body.id) {
			res.status(400).send("Missing Identifier");
			return;
		}
		if (!req.body.content_type || !req.body.args) {
			res.status(400).send("Missing content");
			return;
		}
		if (!HANDLER_TYPE.hasOwnProperty(req.body.content_type)) {
			res.status(400).send("Invalid content type");
			return;
		}
		const reqValid = req as Request<RequestContainer<any>>;
		const handler = this.handlers.get(reqValid.body.content_type);

		if (handler) {
			const response = await handler(this.context, reqValid);
			if(!response) {
				throw new Error("Handler did not return a response");
			}
			res.status(response.code).json(response);
		}
	}
}

export default Orizuru;
/**
 * @author Michał Żaloudik <ponury.kostek@gmail.com>
 */
"use strict";

/**
 * @property name
 * @property code
 * @property message
 */
class ExtError extends Error {
	/**
	 *
	 * @param code
	 * @param message
	 */
	constructor(code, message) {
		super();
		this.name = this.constructor.name;
		this.code = code || "";
		this.message = message || "";
	}

	/**
	 *
	 * @returns {string}
	 */
	toString() {
		const obj = Object(this);
		if (obj !== this) {
			throw new TypeError();
		}
		let name = this.name;
		name = (name === undefined) ? "Error" : String(name);
		let code = this.code;
		code = (code === undefined) ? "" : String(code);
		let message = this.message;
		message = (message === undefined) ? "" : String(message);
		let msg = name + "\n";
		if (code !== "") {
			msg += "\tCode: " + code + "\n";
		}
		if (message !== "") {
			msg += "\tMessage: " + message + "\n";
		}
		return msg;
	}

	/**
	 *
	 * @returns {{code: string, message: string}}
	 */
	toJSON() {
		return {
			code: this.code,
			message: this.message
		};
	}
}

module.exports = ExtError;

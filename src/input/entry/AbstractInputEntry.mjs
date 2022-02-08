import {AbstractLog} from "../../log/AbstractLog.mjs";
import JSZip from "jszip";
import {Options} from "../../Options.mjs";

/**
 * Class AbstractInputEntry
 *
 * @abstract
 */
class AbstractInputEntry {
    /**
     * AbstractInputEntry constructor
     *
     * @throws {Error}
     */
    constructor() {
        if (this.constructor === AbstractInputEntry) {
            throw new Error("Can't instantiate abstract class!");
        }

        /**
         * @type {AbstractLog}
         *
         * @protected
         */
        this.log;
        /**
         * @type {Object}
         *
         * @protected
         */
        this.options;
    }

    /**
     * @param {AbstractLog} log
     * @param {Options} options
     *
     * @returns Promise<void>
     */
    async _init(log, options) {
        this.log = log;
        this.options = options;
    }

    /**
     * @param {string} folder
     *
     * @returns {Promise<void>}
     *
     * @abstract
     */
    async applyToFolder(folder) {

    }

    /**
     * @param {JSZip} zip
     *
     * @returns {Promise<void>}
     *
     * @abstract
     */
    async applyToZip(zip) {

    }

    /**
     * @returns {Promise<string>}
     *
     * @abstract
     */
    async getName() {

    }
}

export {AbstractInputEntry};

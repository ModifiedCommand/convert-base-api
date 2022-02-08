import {AbstractInput} from "../input/AbstractInput.mjs"
import {AbstractLog} from "../log/AbstractLog.mjs";
import {AbstractOutput} from "../output/AbstractOutput.mjs";
import Jimp from "@geekcornernpm/jimp-plugins";
import {Options} from "../Options.mjs";

/**
 * Class AbstractConverter
 *
 * @abstract
 */
class AbstractConverter {
    /**
     * @returns {AbstractConverter[]}
     */
    static getDefaultConverters() {
        const converters = [];

        for (const data of this.DEFAULT_CONVERTER_DATA) {
            converters.push(new this(data));
        }

        return converters;
    }

    /**
     * @returns {*[]}
     *
     * @protected
     *
     * @abstract
     */
    static get DEFAULT_CONVERTER_DATA() {

    }

    /**
     * AbstractConverter constructor
     *
     * @param {*} data
     *
     * @throws {Error}
     */
    constructor(data) {
        if (this.constructor === AbstractConverter) {
            throw new Error("Can't instantiate abstract class!");
        }

        /**
         * @type {AbstractInput}
         *
         * @protected
         */
        this.input;
        /**
         * @type {AbstractOutput}
         *
         * @protected
         */
        this.output;
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
        /**
         * @type {*}
         *
         * @protected
         */
        this.data = data;
    }

    /**
     * @param {AbstractInput} input
     * @param {AbstractOutput} output
     * @param {AbstractLog} log
     * @param {Options} options
     *
     * @returns Promise<void>
     */
    async _init(input, output, log, options) {
        this.input = input;
        this.output = output;
        this.log = log;
        this.options = options;
    }

    /**
     * @param {number} width
     * @param {number} height
     * @param {string|number} background
     *
     * @returns {Promise<Jimp>}
     *
     * @throws {Error}
     *
     * @protected
     */
    async createImage(width, height, background = 0) {
        return Jimp.create(width, height, background);
    }

    /**
     * @param {string} file
     *
     * @returns {Promise<Jimp>}
     *
     * @throws {Error}
     *
     * @protected
     */
    async readImage(file) {
        return Jimp.read(await this.output.read(file));
    }

    /**
     * @param {string} file
     * @param {Jimp} image
     * @param {string} mime
     *
     * @returns {Promise<void>}
     *
     * @protected
     */
    async writeImage(file, image, mime = Jimp.MIME_PNG) {
        await this.output.write(file, await image.getBufferAsync(mime));
    }

    /**
     * @param {string} file
     * @param {*} json
     *
     * @returns {Promise<void>}
     *
     * @protected
     */
    async writeJson(file, json) {
        await this.output.write(file, Buffer.from(JSON.stringify(json, null, 2)));
    }

    /**
     * @returns {Promise<AbstractConverter[]>}
     *
     * @throws {Error}
     *
     * @abstract
     */
    async convert() {

    }
}

export {AbstractConverter};

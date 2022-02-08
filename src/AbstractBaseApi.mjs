import {AbstractConverter} from "@modifiedcommand/convert-base-api";
import {AbstractInput} from "./input/AbstractInput.mjs";
import {AbstractLog} from "./log/AbstractLog.mjs";
import {AbstractOutput} from "./output/AbstractOutput.mjs";
import {Options} from "./Options.mjs";

/**
 * Class AbstractBaseApi
 *
 * @abstract
 */
class AbstractBaseApi {
    /**
     * AbstractBaseApi constructor
     *
     * @param {AbstractInput} input
     * @param {AbstractOutput} output
     * @param {AbstractLog} log
     * @param {Options} options
     */
    constructor(input, output, log, options = {}) {
        /**
         * @type {AbstractInput}
         *
         * @protected
         */
        this.input = input;
        /**
         * @type {AbstractOutput}
         *
         * @protected
         */
        this.output = output;
        /**
         * @type {AbstractLog}
         *
         * @protected
         */
        this.log = log;
        /**
         * @type {Options}
         *
         * @protected
         */
        this.options = {
            ...new Options(),
            ...options
        };
    }

    /**
     * @returns {Promise<*>}
     */
    async convert() {
        this.log.log("Start conversion");

        await this.handleInput();

        await this.handleConverters();

        const output = await this.handleOutput();

        this.log.log("Conversion finished");

        if (this.log.warn_count > 0) {
            this.log.warn(`${this.log.warn_count} warn logs occurred`);
        }

        return output;
    }

    /**
     * @returns {Promise<void>}
     *
     * @protected
     */
    async handleInput() {
        await this.output._init(this.input, this.log, this.options);

        for await (const entry of this.input.getEntries()) {
            await entry._init(this.log, this.options);

            await this.output.applyInputEntry(entry);
        }
    }

    /**
     * @returns {Promise<Function<AbstractConverter>[]>}
     *
     * @protected
     *
     * @abstract
     */
    async getInitConverters() {

    }

    /**
     * @returns {Promise<void>}
     *
     * @protected
     */
    async handleConverters() {
        /**
         * @type {AbstractConverter[]}
         */
        const converters = [];

        await addAdditionalConverterClasses(...await this.getInitConverters());

        for await (const converter of getConverters()) {
            await converter._init(this.input, this.output, this.log, this.options);

            await addAdditionalConverters(...await converter.convert());
        }

        /**
         * @returns {AsyncIterableIterator<AbstractConverter>}
         *
         * @throws {Error}
         */
        async function* getConverters() {
            for (const converter of converters) {
                yield converter;
            }
        }

        /**
         * @param {AbstractConverter[]} additional_converters
         *
         * @returns {Promise<void>}
         */
        async function addAdditionalConverters(...additional_converters) {
            for (const additional_converter of additional_converters) {
                converters.push(additional_converter);
            }
        }

        /**
         * @param {Function<AbstractConverter>[]} additional_converter_classes
         *
         * @returns {Promise<void>}
         */
        async function addAdditionalConverterClasses(...additional_converter_classes) {
            await addAdditionalConverters(...additional_converter_classes.reduce((converters, converter_class) => {
                converters.push(...converter_class.getDefaultConverters());

                return converters;
            }, []));
        }
    }

    /**
     * @returns {Promise<*>}
     *
     * @protected
     */
    async handleOutput() {
        return this.output.generate();
    }
}

export {AbstractBaseApi};

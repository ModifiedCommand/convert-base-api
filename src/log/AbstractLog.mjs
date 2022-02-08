/**
 * Class AbstractLog
 *
 * @abstract
 */
class AbstractLog {
    /**
     * AbstractLog constructor
     *
     * @throws {Error}
     */
    constructor() {
        if (this.constructor === AbstractLog) {
            throw new Error("Can't instantiate abstract class!");
        }

        /**
         * @type {number}
         *
         * @protected
         */
        this.warn_count = 0;
    }

    /**
     * @param {string} log
     *
     * @abstract
     */
    log(log) {

    }

    /**
     * @param {string} log
     *
     * @abstract
     */
    warn(log) {

    }

    /**
     * @protected
     */
    warnCount() {
        this.warn_count++;
    }
}

export {AbstractLog};

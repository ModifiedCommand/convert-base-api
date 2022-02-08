import {AbstractLog} from "./AbstractLog.mjs";

/**
 * Class ConsoleLog
 */
class ConsoleLog extends AbstractLog {
    /**
     * @inheritDoc
     */
    log(log) {
        console.log(log);
    }

    /**
     * @inheritDoc
     */
    warn(log) {
        this.warnCount();

        console.warn("\x1b[33m\x1b[40m", `WARNING: ${log}`, "\x1b[0m");
    }
}

export {ConsoleLog};

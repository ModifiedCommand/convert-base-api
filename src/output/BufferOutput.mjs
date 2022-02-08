import { AbstractOutput } from "./AbstractOutput.mjs";
import { basename, dirname } from "path";
import JSZip from "jszip";

/**
 * Class BufferOutput
 */
class BufferOutput extends AbstractOutput {
    /**
     * @inheritDoc
     */
    constructor() {
        super();

        /**
         * @type {JSZip}
         *
         * @protected
         */
        this.zip = new JSZip();
    }

    /**
     * @inheritDoc
     */
    async applyInputEntry(entry) {
        await entry.applyToZip(this.zip);
    }

    /**
     * @inheritDoc
     */
    async generate() {
        this.log.log(`Generate ${Buffer.name} zip`);

        return this.generateZip("nodebuffer");
    }

    /**
     * @param {string} type
     *
     * @returns {Promise<Buffer>}
     *
     * @protected
     */
    async generateZip(type) {
        return this.zip.generateAsync({ type })
    }

    /**
     * @inheritDoc
     */
    async exists(path) {
        return (path in this.zip.files);
    }

    /**
     * @inheritDoc
     */
    async rename(from, to) {
        //this.zip.rename(from, to);
    }

    /**
     * @inheritDoc
     */
    async read(file) {
        return this.zip.file(file).async("nodebuffer");
    }

    /**
     * @inheritDoc
     */
    async write(file, data) {
        this.zip.file(file, data);
    }

    /**
     * @inheritDoc
     */
    async delete(path) {
        this.zip.remove(path);
    }

    /**
     * @inheritDoc
     */
    async copy(from, to) {
        this.zip.copy(from, to);
    }

    /**
     * @inheritDoc
     */
    async lookupFile(name) {
        const entry = Object.values(this.zip.files).find(entry => {
            return (!entry.dir && basename(entry.name) === name);
        });

        if (entry) {
            return dirname(entry.name);
        } else {
            return null;
        }
    }
}

export { BufferOutput };
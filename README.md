# Base API for convert

## Requirements

This is an "ES module"

So it requires a current web browser or NodeJS v14

If you need older support, please try to use something like `webpack` or `babel`

## Usage

Add it as a dependency to your `package.json`

```bash
yarn add @geekcornernpm/convert-base-api
```

Create an API class

```javascript
import {AbstractBaseApi} from "@geekcornernpm/convert-base-api";

/**
 * Class ConvertXYZApi
 */
class ConvertXYZApi extends AbstractBaseApi {
    /**
     * @inheritDoc
     */
    async getInitConverters() {
        return [...];
    }
}

export {ConvertXYZApi};
```

## Use it in your code

```javascript
import {ConsoleLog, Input, LocalFileInputEntry, LocalFileOutput} from "@geekcornernpm/convert-base-api";
import {ConvertXYZApi} from "...";

let output;
try {
    output = await new ConvertXYZApi(input, output, log, options).convert();
} catch (err) {

}
```

### Input

| Import | Description |
|--------|-------------|
| `Input` | The input consists on one input entry (Common) |
| `ArrayInput` | The input consists on multiple input entries (For instance a selected folder with multiple `FileInputEntry`) |
| `AbstractInput` | Base input |

### Input entry

| Import | For type |
|--------|----------|
| `BufferInputEntry` | - `ArrayBuffer`<br>- `Blob`<br>- `Buffer`<br>- `Uint8Array` |
| `FileInputEntry` | `File` |
| `LocalFileInputEntry` | Local file |
| `LocalFolderInputEntry` | Local folder |
| `AbstractInputEntry` | Base input entry |

### Output

| Import | For type |
|--------|----------|
| `ArrayBufferOutput` | `ArrayBuffer` |
| `BlobOutput` | `Blob` |
| `BufferOutput` | `Buffer` |
| `FileBlobOutput` | `File` |
| `LocalFileOutput` | Local file |
| `LocalFolderOutput` | Local folder |
| `Uint8ArrayOutput` | `Uint8Array` |
| `AbstractOutput` | Base output |

### Log

| Import | Description |
|--------|-------------|
| `ConsoleLog` | Log to console |
| `SlientLog` | Disable log |
| `AbstractLog` | Base log |

### Options

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `experimental` | `bool` | `false` | Enable experimental conversions |

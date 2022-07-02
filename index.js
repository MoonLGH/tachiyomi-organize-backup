import protobuf from "protobufjs"
import { gunzipSync } from "zlib";
import fs from "fs"

const root = protobuf.loadSync('utils/tachiyomi.proto');
const Backup = root.lookupType('Backup');

console.log(Backup)

let read = fs.readFileSync("input/input.proto.gz")
let data = gunzipSync(read)
let final = Backup.decode(data)
console.log(final)

fs.writeFileSync("processing/tachi.json",JSON.stringify(final.toJSON(),null,3))
import protobuf from "protobufjs"
import { gunzipSync } from "zlib";
import fs from "fs"

const root = protobuf.loadSync('tachiyomi.proto');
const Backup = root.lookupType('Backup');
// print hello world


console.log(Backup)

let read = fs.readFileSync("test1.proto.gz")
let data = gunzipSync(read)
let final = Backup.decode(data)
console.log(final)

fs.writeFileSync("tachi.json",JSON.stringify(final.toJSON(),null,3))
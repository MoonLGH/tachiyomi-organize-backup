import protobuf from "protobufjs"
import fs from "fs"
import { gzipSync } from "zlib";
const json = JSON.parse(fs.readFileSync("processing/tachiOutput.json"))


const root = protobuf.loadSync('utils/tachiyomi.proto');
const Backup = root.lookupType('Backup');


const encode = Backup.encode(json).finish()
console.log(encode)
const final = gzipSync(encode)
fs.writeFileSync("output/Output.proto.gz",final)

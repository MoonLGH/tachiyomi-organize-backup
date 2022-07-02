import fs from "fs"
const json = JSON.parse(fs.readFileSync("processing/tachi.json"))
// const json = require("processing/tachi.json")

let genresObj = []

for (let i = 0; i < json.backupManga.length; i++) {
    if(!json.backupManga[i].genre) {
        json.backupManga[i].nogenre = true
    } else {
        for (let x = 0; x < json.backupManga[i].genre.length; x++) {
            genresObj.push(json.backupManga[i].genre[x])
        }
    }
}

let uniq = ["ALL",...[...new Set(genresObj)].sort((a,b)=>a-b),"UNKNOWN"];
let categoryBackup = []
for (let i = 0; i < uniq.length; i++) {
    if(i === 0) {
        categoryBackup.push({"name":uniq[i]})
    }else {
        categoryBackup.push({"name":uniq[i],"order":i})
    }
}
json.backupCategories = categoryBackup

for (let i = 0; i < json.backupManga.length; i++) {
    if(json.backupManga[i].categories){
        delete json.backupManga[i].categories
    }

    json.backupManga[i].categories =[]

    json.backupManga[i].categories.push(findCategory("ALL"))

    if(json.backupManga[i].nogenre){
        json.backupManga[i].categories.push(findCategory("UNKNOWN"))
    }

    for (let x = 0; x < json.backupManga[i].genre.length; x++) {
        json.backupManga[i].categories.push(findCategory(json.backupManga[i].genre[x]))
    }
}

function findCategory(name) {
    let find = categoryBackup.find((o) => o.name===name)
    if(!find.order) {
        find.order = 0
    }
    return find.order.toString()
}

fs.writeFileSync("processing/tachiOutput.json",JSON.stringify(json,null,3))
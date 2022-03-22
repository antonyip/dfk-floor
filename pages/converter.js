const fs = require("fs")

var jsonObj = JSON.parse(fs.readFileSync("prices.json"))



var priceParams = {"min": 0, "max": 0, "avg":0, "median":0, "mode":0, "twavg":0, "range":0, "size":0}

var dataParams = {
  "0":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "1":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "2":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "3":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "4":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "5":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "6":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "7":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "16":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "17":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "18":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "19":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "24":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "25":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}},
  "28":{"Rarity":{"0":{"z":""},"1":{"z":""},"2":{"z":""},"3":{"z":""},"4":{"z":""}}}
}

//"{\"heroClass\":\"sage\",\"profession\":\"foraging\",\"rarity\":\"mythic\",\"generation\":10,\"summons\":2}": 677.7815631865,

const GS_HEROCLASS_TO_HEROCLASS = {
    'warrior': "0",
    'knight': "1",
    'thief': "2",
    'archer': "3",
    'priest': "4",
    'wizard': "5",
    'monk': "6",
    'pirate': "7",
    'paladin': "16",
    'darkKnight': "17",
    'summoner': "18",
    'ninja': "19",
    'dragoon': "24",
    'sage': "25",
    'dreadKnight': "28",
}

const GS_PROFESSION_TO_PROFESSION = {
    "mining": "mining",
    "fishing": "fishing",
    "gardening": "gardening",
    "foraging": "foraging",
}

const GS_RARITY_TO_RARITY = {
    'common': "0",
    'uncommon': "1",
    'rare': "2",
    'legendary': "3",
    'mythic': "4",
  };

const GS_GENERATION_TO_GENERATION = {
    "0" : "g0",
    "1" : "g1",
    "2" : "g2",
    "3" : "g3",
    "4" : "g4",
    "5" : "g5",
    "6" : "g6",
    "7" : "g7",
    "8" : "g8",
    "9" : "g9",
    "10" : "g10",
    "11" : "g11"
}

var heroClass = ["0","1","2","3","4","5","6","7","16","17","18","19","24","25","28"]
var rarity = ["0","1","2","3","4"]
var generations = ["g0","g1","g2","g3","g4","g5","g6","g7","g8","g9","g10","g11"]
var professions = ["mining","fishing","gardening","foraging"]
var sumLeft = ["0","1","2","3","4","5","6","7","8","9","10"]
heroClass.forEach(c => {
  rarity.forEach(r => {
    dataParams[c]["Rarity"][r] = {}
    generations.forEach(g => {
      dataParams[c]["Rarity"][r][g] = {}
      professions.forEach(p => {
        dataParams[c]["Rarity"][r][g][p] = {}
        sumLeft.forEach (s => {
          dataParams[c]["Rarity"][r][g][p][s] = JSON.parse(JSON.stringify(priceParams));
        })
      })
    })
  })
})

//console.log(jsonObj);
//"{\"heroClass\":\"sage\",\"profession\":\"foraging\",\"rarity\":\"mythic\",\"generation\":10,\"summons\":2}": 677.7815631865,
for (const key in jsonObj) {
    if (Object.hasOwnProperty.call(jsonObj, key)) {
        const element = jsonObj[key];
        const price_type = JSON.parse(key);
        const c = GS_HEROCLASS_TO_HEROCLASS[price_type["heroClass"]];
        const r = GS_RARITY_TO_RARITY[price_type["rarity"]];
        const g = GS_GENERATION_TO_GENERATION[price_type["generation"].toString()];
        const p = GS_PROFESSION_TO_PROFESSION[price_type["profession"]];
        const s = price_type["summons"].toString();
        dataParams[c]["Rarity"][r][g][p][s] = element;
    }
}

console.log(dataParams[0].Rarity[0]);

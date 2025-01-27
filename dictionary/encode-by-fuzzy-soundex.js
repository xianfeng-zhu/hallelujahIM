const fs = require("fs");
const phonex = require("talisman/phonetics/fuzzy-soundex.js");
const words = require("./words_with_frequency_and_translation_and_ipa.json");

const map = {};
for (let key in words) {
  if (key.length > 3) {
    const encoded = phonex(key);
    const list = map[encoded] || [];
    list.push(key);
    map[encoded] = list;
  }
}

for (let code in map) {
  map[code] = map[code]
    .sort((a, b) => {
      return words[b].frequency - words[a].frequency;
    })
    .slice(0, 30);
}

fs.writeFileSync("./fuzzy_soundex_encoded_words.json", JSON.stringify(map), "utf-8");

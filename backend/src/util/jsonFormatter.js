const someJson = {
  "name": "John Doe",
  "age": 30,
  "isStudent": false,
  "hobbies": ["reading", "hiking", "gaming"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "zip": "12345"
  }
}

function view(data, tabs) {
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      tabsLog(key, "", tabs, "")
      value.forEach(elem => tabsLog("", elem, tabs + 1, "-"))
      continue;
    }

    if (typeof(value) === "object") {
      tabsLog(key, "", tabs, "")
      view(value, ++tabs);
      continue;
    }
    
    tabsLog(key, value, tabs, ":")
  }
}

function tabsLog(title, value, tabs, seporator) {
  console.log('\t'.repeat(tabs), title, seporator, value);
}

view(someJson, 0)

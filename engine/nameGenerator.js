window.tr = window.tr || {};
window.tr.utils = window.tr.utils || {};

(function() {
  var cultures = {
    "spanish": {
      names:["Jose", "Juan", "Carlos", "Amadeo", "Javier", "Alejandro", "Sheila", "Marta", "Maria", "Luisa", "Hector"],
      surnames:["Garcia", "Perez", "Lopez", "Jimenez", "Alvarez", "Aristegui", "Valdes", "Hita", "Herrera", "Martin", "Arias"]
    },
    "anglosaxon": {
      names:["John", "Jim", "Peter", "Oliver", "Sheila", "Sara", "Mary", "Ann", "Liz", "Tom", "Robert", "Bob", "James", "Gordon"],
      surnames:["Smith", "Wilson", "Johnson", "ODoherty", "Watt", "Weatherley", "Dohan", "Lought", "Tepley", "Poulsen", "Stone", "Benley"]
    },
    "arabic": {
      names:["Mohammad", "Abdul", "Abdala", "Osama"],
      surnames:["Bin Ragul", "Araffat", "Hussein", "Hommeini"]
    },
    "eastAsian": {
      names:["Yu", "Kim", "Mao"],
      surnames:["Chang", "Young", "Soo", "Hanzo"]
    },
    "generic": {
      names:["Xabier", "Moses", "Kit", "Ariel"],
      surnames:["Vidal", "Unchnagger", "Cambridge", "Crownwell"]
    }

  }
  window.tr.utils.nameGenerator = function(culture) {
    var culturesArray = ["spanish", "anglosaxon", "arabic", "eastAsian", "generic"]
    if(!culture || !culture in cultures) {
      var pos = Math.floor(Math.random() * culturesArray.length);
      culture = culturesArray[pos]
    }
    return cultures[culture].names[Math.floor(Math.random() * cultures[culture].names.length)] + ' ' +
       cultures[culture].surnames[Math.floor(Math.random() * cultures[culture].surnames.length)]
  };
})();

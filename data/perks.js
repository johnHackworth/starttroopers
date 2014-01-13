window.tr = window.tr || {};
window.tr.data = window.tr.data || {};

window.tr.data.perks = {
  "engineer": {
    "name": "Engineer",
    "icon": "engineer",
    "required": {mainInterest: "engineering"},
    "description": "Engineering school licenciated",
    "randEffects": false,
    "effects": {
      "architecture": 20,
      "backend": 15,
      "frontend": 10,
      "operations": 5
    }
  },
  "selfTaught": {
    "name": "Self Taught",
    "icon": "self_taught",
    "required": {},
    "description": "Learned everything by reading and studying",
    "randEffects": true,
    "effects": {
      "business": 10,
      "architecture": 40,
      "backend": 40,
      "frontend": 40,
      "operations": 40,
      "visualDesign": 5,
      "productDesign": 15,
      "qa": 15
    }
  },
  "appDeveloper": {
    "name": "App Developer",
    "icon": "app_developer",
    "required": {mainInterest: "engineering"},

    "description": "Knows about native apps development",
    "randEffects": false,
    "effects": {
      mobileSkills: true
    }
  },
  "frontender": {
    "name": "Frontender",
    "icon": "front",
    "required": {mainInterest: "engineering"},
    "description": "Expertise on frontend developing",
    "randEffects": false,
    "effects": {
      "frontend": 30,
      "visualDesign": 5,
    }
  },
  "backender": {
    "name": "Backender",
    "icon": "back",
    "required": {mainInterest: "engineering"},
    "description": "Expertise on backend developing",
    "randEffects": false,
    "effects": {
      "backend": 30,
      "operations": 5,
    }
  },
  "devops": {
    "name": "devops",
    "icon": "devops",
    "required": {mainInterest: "engineering"},
    "description": "Expertise on system operations",
    "randEffects": false,
    "effects": {
      "architecture": 10,
      "operations": 30,
    }
  },
  "qa": {
    "name": "QA",
    "icon": "qa",
    "required": {mainInterest: "engineering"},
    "description": "Expertise on quality",
    "randEffects": false,
    "effects": {
      "qa": 35
    }
  },
  "craftsman": {
    "name": "Craftsman",
    "icon": "craftsman",
    "required": {mainInterest: "engineering"},
    "description": "Very careful about the quality",
    "randEffects": false,
    "effects": {
      "hypeable": 15,
      "learning": 20,
      "bugModificator": -0.25,
      "detailModificator": -0.05
    }
  },
  "cleancoder": {
    "name": "Cleancoder",
    "icon": "cleancoder",
    "required": {mainInterest: "engineering"},
    "description": "Zealot of the best practices",
    "randEffects": false,
    "effects": {
      "hypeable": 30,
      "learning": 10,
      "bugModificator": -0.20,
      "detailModificator": -0.35
    }
  },
  "cowboyCoder": {
    "name": "Cowboy coder",
    "icon": "cowboy_coder",
    "required": {mainInterest: "engineering"},
    "description": "Not easily fit into developing practices and processes",
    "randEffects": false,
    "effects": {
      "hypeable": -5,
      "learning": 10,
      "bugModificator": 0.20,
      "detailModificator": 0.20
    }
  },
  "debugger": {
    "name": "Debugger",
    "icon": "debugger",
    "required": {mainInterest: "engineering"},
    "description": "Great hability finding and fixing bugs",
    "randEffects": false,
    "effects": {
      "debugger": true,
      "qa": 20
    }
  },
  "designEye": {
    "name": "Design eye",
    "icon": "design_eye",
    "required": {mainInterest: "engineering"},
    "description": "Able to design",
    "randEffects": false,
    "effects": {
      "visualDesign": 35,
      "frontend": 20
    }
  },
  "brogrammer": {
    "name": "Brogrammer",
    "icon": "brogrammer",
    "required": {mainInterest: "engineering"},
    "description": "Breaks the usual expectations of quiet nerdiness",
    "randEffects": false,
    "effects": {
      "sociability": 30,
      "conflictive": 10
    }
  },
  "dataScientist": {
    "name": "Data Scientist",
    "icon": "data_scientist",
    "required": {mainInterest: "engineering"},
    "description": "Theoretical knowledge about the field",
    "randEffects": false,
    "effects": {
      "architecture": 30
    }
  },
  "scenester": {
    "name": "Scenester",
    "icon": "scenester",
    "required": {mainInterest: "engineering"},
    "description": "Participates in the local developers scene",
    "randEffects": false,
    "effects": {
      "followers": 300
    }
  },
  "rockstar": {
    "name": "Rock star",
    "icon": "rockstar",
    "required": {mainInterest: "engineering"},
    "description": "One of the heads of the local developer scene",
    "randEffects": false,
    "effects": {
      "followers": 1000
    }
  },
  "guru": {
    "name": "guru",
    "icon": "guru",
    "required": {mainInterest: "engineering"},
    "description": "Worldwide followers",
    "randEffects": false,
    "effects": {
      "followers": 4000
    }
  },
  "nerdy": {
    "name": "Nerdy",
    "icon": "nerdy",
    "required": {},
    "description": "Nerdy personality and interests",
    "randEffects": false,
    "effects": {
      "learning": 20,
      "sociability": -20
    }
  },
  "elocuent": {
    "name": "Elocuent",
    "icon": "elocuent",
    "required": {},
    "description": "Great communicator",
    "randEffects": false,
    "effects": {
      "negotiation": 10,
      "sociability": 5
    }
  },
  "shy": {
    "name": "Shy",
    "icon": "shy",
    "required": {},
    "description": "Not confortable in social situations",
    "randEffects": false,
    "effects": {
      "negotiation": -5,
      "sociability": -10
    }
  },
  "mba": {
    "name": "MBA",
    "icon": "mba",
    "required": {mainInterest: "business"},
    "description": "MBA graduated",
    "randEffects": false,
    "effects": {
      "business": 30,
      "marketing": 10
    }
  },
  "marketing": {
    "name": "Marketing",
    "icon": "marketing",
    "required": {mainInterest: "business"},
    "description": "Marketing studies",
    "randEffects": false,
    "effects": {
      "business": 10,
      "marketing": 30
    }
  },
  "businessSelfTaught": {
    "name": "Self Taught",
    "icon": "self_taught_business",
    "required": {},
    "description": "Learned everything by reading and studying",
    "randEffects": true,
    "effects": {
      "business": 40,
      "marketing": 40,
      "architecture": 10,
      "backend": 10,
      "frontend": 20,
      "operations": 10,
      "visualDesign": 25,
      "productDesign": 35,
      "qa": 30
    }
  },
  "negotiator": {
    "name": "Skilled Negotiator",
    "icon": "negotiator",
    "required": {mainInterest: "business"},
    "description": "High hability negotiating with others",
    "randEffects": false,
    "effects": {
      "negotiation": 20,
    }
  },
  "enterpreneur": {
    "name": "Enterpreneur",
    "icon": "enterpreneur",
    "required": {mainInterest: "business"},
    "description": "Knows how to start and mantain a business",
    "randEffects": false,
    "effects": {
      "sociability": 10,
      "marketing": 20,
      "business": 10,
    }
  },
  "leader": {
    "name": "Leader",
    "icon": "leader",
    "required": {mainInterest: "business"},
    "description": "Knows how to inspire and liderate people",
    "randEffects": false,
    "effects": {
      "sociability": 30,
    }
  },
  "publicist": {
    "name": "Publicist",
    "icon": "publicist",
    "required": {mainInterest: "business"},
    "description": "Knows how to sell a product",
    "randEffects": false,
    "effects": {
      "marketing": 30,
      "productDesign": 15
    }
  },
  "accountExecutive": {
    "name": "Account executive",
    "icon": "accountExecutive",
    "required": {mainInterest: "business"},
    "description": "Able to acquire investor and clients",
    "randEffects": false,
    "effects": {
      "marketing": 15,
      "business": 15,
      "sociability": 30
    }
  },
  "creative": {
    "name": "Creative",
    "icon": "creative",
    "required": {},
    "description": "Can think in new products and how to present them",
    "randEffects": false,
    "effects": {
      "marketing": 25,
      "visualDesign": 15
    }
  },
  "socialMedia": {
    "name": "Social Media Manager",
    "icon": "socialMedia",
    "required": {mainInterest: "business"},
    "description": "Able to manage the public and customers interactions",
    "randEffects": false,
    "effects": {
      "marketing": 15,
      "sociability": 15,
      "followers": 700
    }
  },
  "headHunter": {
    "name": "head hunter",
    "icon": "headHunter",
    "required": {mainInterest: "business"},
    "description": "Knows how to search and evaluate candidates for job positions",
    "randEffects": false,
    "effects": {
      "scouting": 40,
      "followers": 400
    }
  },
  "mediaSavvy": {
    "name": "Media savvy",
    "icon": "mediaSavvy",
    "required": {mainInterest: "business"},
    "description": "Knows how to deal with media",
    "randEffects": false,
    "effects": {
      "marketing": 10,
      "followers": 2000
    }
  },
  "guruBusiness": {
    "name": "guru",
    "icon": "guruBusiness",
    "required": {mainInterest: "business"},
    "description": "Is a star on the net",
    "randEffects": false,
    "effects": {
      "followers": 5000
    }
  },
  "designSchool": {
    "name": "Design School",
    "icon": "designSchool",
    "required": {mainInterest: "design"},
    "description": "Graduated on a design school",
    "randEffects": false,
    "effects": {
      visualDesign: 40,
      frontend: 10,
      productDesign: 30
    }
  },
  "selfTaughtDesign": {
    "name": "Self Taught",
    "icon": "selfTaughtDesign",
    "required": {mainInterest: "design"},
    "description": "Learned everything by reading and experimenting",
    "randEffects": true,
    "effects": {
      visualDesign: 40,
      frontend: 40,
      productDesign: 40,
      architecture: 10,
      backend: 10,
      productDesign: 40,
      operations: 10,
      qa: 20,
      marketing: 20
    }
  },
  "UX": {
    "name": "User Experience Expert",
    "icon": "ux",
    "required": {mainInterest: "design"},
    "description": "Expert designing usable interfaces",
    "randEffects": false,
    "effects": {
      productDesign: 30
    }
  },
  "colorTheory": {
    "name": "Color Theory",
    "icon": "color_theory",
    "required": {mainInterest: "design"},
    "description": "Knows how to use colors on design",
    "randEffects": false,
    "effects": {
      visualDesign: 30,
    }
  },
  "seniority": {
    "name": "Seniority",
    "icon": "seniority",
    "required": {mainInterest: "design"},
    "description": "Knows the industry after being in it for some time",
    "randEffects": false,
    "effects": {
      visualDesign: 10,
      productDesign: 10
    }
  },
  "dribbbler": {
    "name": "Dribbbler",
    "icon": "dribbbler",
    "required": {mainInterest: "design"},
    "description": "Participate and gets inspiration from online design comunities",
    "randEffects": false,
    "effects": {
      visualDesign: 10,
      productDesign: -10,
      followers: 1000
    }
  },
  "developingSkills": {
    "name": "Developing Skills",
    "icon": "developing_skills",
    "required": {mainInterest: "design"},
    "description": "Knows how to code",
    "randEffects": false,
    "effects": {
      frontend: 40,
      backend: 30
    }
  },
  "appDesigner": {
    "name": "App Designer",
    "icon": "app_designer",
    "required": {mainInterest: "design"},

    "description": "Knows about native apps design",
    "randEffects": false,
    "effects": {
      mobileSkills: true
    }
  },
  "industrialDesigner": {
    "name": "Industrial Designer",
    "icon": "industrial_designer",
    "required": {mainInterest: "design"},

    "description": "Studied on a industrial design school",
    "randEffects": false,
    "effects": {
      productDesign: 30
    }
  },
  "scenesterDesign": {
    "name": "Scenester",
    "icon": "scenester_design",
    "required": {mainInterest: "design"},
    "description": "Participates in the local design scene",
    "randEffects": false,
    "effects": {
      "followers": 1500
    }
  },
  "rockstarDesign": {
    "name": "Rock star",
    "icon": "rockstar_design",
    "required": {mainInterest: "design"},
    "description": "One of the heads of the local designer scene",
    "randEffects": false,
    "effects": {
      "followers": 4000
    }
  },
  "guruDesign": {
    "name": "guru",
    "icon": "guru_design",
    "required": {mainInterest: "design"},
    "description": "Worldwide following",
    "randEffects": false,
    "effects": {
      "followers": 9000
    }
  },

}

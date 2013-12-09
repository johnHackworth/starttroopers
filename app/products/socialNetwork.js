window.tr = window.tr || {};
window.tr.products = window.tr.products || {};

window.tr.products.SocialNetwork = function(options) {
}

window.tr.products.SocialNetwork.prototype = {
  availableModules: {
    "basicSite": {
      name: "Basic structure",
      goals: {
        definitionGoal: 100,
        designGoal: 100,
        backGoal: 150,
        frontGoal: 100,
        architectureGoal: 150,
        operationsGoal: 50,
      },
      maxUsers: 1000000,
      weight: 100,
      earlyAdopters: ['technology', 'socialize'],
      marketingPunch: 10000,
      description: "The basic infrastructure to make your site open to public. Creating accounts, login, public profiles, comments... all the basic stuff!"
    },
    "basicPrivacy": {
      name: "Basic privacy settings",
      required: "basicSite",
      goals: {
        definitionGoal: 60,
        designGoal: 30,
        backGoal: 50,
        frontGoal: 50,
        architectureGoal: 50,
        operationsGoal: 30,
      },
      maxUsers: 0,
      weight: 30,
      earlyAdopters: ['technology'],
      marketingPunch: 5000,
      description: "Let your users define their own level of privacity and who can to see what"
    },
    "webscale": {
      name: "Webscale",
      required: "basicSite",
      goals: {
        definitionGoal: 10,
        designGoal: 30,
        backGoal: 80,
        frontGoal: 30,
        architectureGoal: 100,
        operationsGoal: 100,
      },
      maxUsers: 5000000,
      marketingPunch: 3000,
      weight: 5,
      earlyAdopters: ['technology'],
      description: "Prepare your site to reach the hungry masses! You need to implement this to be able to have tons of visitors"
    },
    "basicPictureProcessing": {
      name: "Picture processing",
      required: "basicSite",
      goals: {
        definitionGoal: 40,
        designGoal: 60,
        backGoal: 50,
        frontGoal: 100,
        architectureGoal: 30,
        operationsGoal: 50,
      },
      maxUsers: 100000,
      weight: 60,
      marketingPunch: 7000,
      earlyAdopters: ['gadgets', 'fashion', 'travel'],
      description: "Let your users upload and share their pictures!"
    },
    "integrateExternalAdvertising": {
      name: "Integrate external advertising",
      required: "basicSite",
      goals: {
        definitionGoal: 20,
        designGoal: 20,
        backGoal: 50,
        frontGoal: 60,
        architectureGoal: 30,
        operationsGoal: 60,
      },
      maxUsers: 0,
      marketingPunch: 100,
      weight: 1,
      earlyAdopters: [],
      flag: "externalAds",
      description: "Ad some advertising on your site and begin to monetize!"
    },
    "adServer": {
      name: "Create own ad adServer",
      required: "integrateExternalAdvertising",
      goals: {
        definitionGoal: 70,
        designGoal: 70,
        backGoal: 150,
        frontGoal: 120,
        architectureGoal: 120,
        operationsGoal: 80,
      },
      maxUsers: 0,
      weight: 3,
      earlyAdopters: [],
      marketingPunch: 1000,
      flag: "internalAds",
      description: "Why to pay a share of the revenues to a provider? Create your own ad server!"
    },
  }
}

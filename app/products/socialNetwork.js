window.tr = window.tr || {};
window.tr.products = window.tr.products || {};

window.tr.products.SocialNetwork = function(options) {
}

window.tr.products.SocialNetwork.prototype = {
  availableModules: {
    "basicSite": {
      name: "Basic structure",
      color: "#55BB55",
      goals: {
        definitionGoal: 50,
        designGoal: 50,
        backGoal: 80,
        frontGoal: 50,
        architectureGoal: 80,
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
      // required: "basicSite",
      goals: {
        definitionGoal: 30,
        designGoal: 20,
        backGoal: 50,
        frontGoal: 30,
        architectureGoal: 60,
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
      // required: "basicSite",
      goals: {
        definitionGoal: 10,
        designGoal: 30,
        backGoal: 60,
        frontGoal: 30,
        architectureGoal: 60,
        operationsGoal: 60,
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
        definitionGoal: 30,
        designGoal: 40,
        backGoal: 30,
        frontGoal: 70,
        architectureGoal: 20,
        operationsGoal: 40,
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
        definitionGoal: 10,
        designGoal: 10,
        backGoal: 30,
        frontGoal: 40,
        architectureGoal: 20,
        operationsGoal: 20,
      },
      maxUsers: 0,
      marketingPunch: 100,
      weight: 1,
      earlyAdopters: [],
      flag: "externalAds",
      description: "Ad some advertising on your site and begin to monetize!"
    },
    "mobileSite": {
      name: "Create a mobile version of the site",
      required: "basicSite",
      goals: {
        definitionGoal: 40,
        designGoal: 60,
        backGoal: 20,
        frontGoal: 60,
        architectureGoal: 20,
        operationsGoal: 10,
      },
      maxUsers: 500000,
      weight: 80,
      earlyAdopters: ['technology'],
      marketingPunch: 1000,
      flag: "mobile",
      description: "Addapt your site to everyone using a mobile device"
    },
    "mobileApp": {
      name: "Create a native app for the site",
      required: "basicSite",
      goals: {
        definitionGoal: 50,
        designGoal: 70,
        backGoal: 20,
        frontGoal: 70,
        architectureGoal: 20,
        operationsGoal: 20,
      },
      maxUsers: 500000,
      weight: 90,
      earlyAdopters: ['technology'],
      marketingPunch: 4000,
      flag: "mobile",
      description: "Create a native app for your users"
    },
    "glassApp": {
      name: "Create a google glass app for the site ",
      required: "mobileApp",
      goals: {
        definitionGoal: 90,
        designGoal: 40,
        backGoal: 30,
        frontGoal: 70,
        architectureGoal: 20,
        operationsGoal: 20,
      },
      maxUsers: 200000,
      weight: 60,
      earlyAdopters: ['technology'],
      marketingPunch: 10000,
      flag: "mobile",
      description: "Create an app for google glass users. Let your user wear your site!"
    },
    "adServer": {
      name: "Create own ad adServer",
      required: "integrateExternalAdvertising",
      goals: {
        definitionGoal: 40,
        designGoal: 30,
        backGoal: 80,
        frontGoal: 60,
        architectureGoal: 80,
        operationsGoal: 50,
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

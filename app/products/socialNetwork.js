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
      description: "Let your users upload and share their pictures!"
    },

  }
}

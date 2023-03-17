export const testRecipe = {
  id: 1,
  type: "SAVORY",
  name: "Molho de tomate",
  description: "Toda família tem a sua receita preferida de molho ",
  shortDescription: null,
  creationDate: "2023-03-16T00:00:00",
  image: "https://i.imgur.com/bEu5QyQ.png",
  steps: [
    {
      id: 1,
      positionOrder: 1,
      score: 0,
      action: {
        id: 1,
        name: "Cortar",
      },

      ingredients: [
        {
          id: 1,
          quantity: 5,
          interactionTimes: 5,
          ingredientNeededStatus: "WHOLE",
          ingredient: {
            id: 1,
            name: "Tomate",
            image: "url",
            assetName: "tomato",
          },
        },
      ],
    },

    {
      id: 2,
      positionOrder: 2,
      score: 0,
      action: {
        id: 2,
        name: "Picar",
      },

      ingredients: [
        {
          id: 2,
          quantity: 1,
          interactionTimes: 25,
          ingredientNeededStatus: "WHOLE",
          ingredient: {
            id: 2,
            name: "Cebola",
            image: "url",
            assetName: "onion",
          },
        },

        {
          id: 3,
          quantity: 1,
          interactionTimes: 25,
          ingredientNeededStatus: "WHOLE",
          ingredient: {
            id: 3,
            name: "Dente de alho",
            image: "url",
            assetName: "garlic",
          },
        },
      ],
    },

    {
      id: 3,
      positionOrder: 3,
      score: 0,
      action: {
        id: 3,
        name: "Refogar",
      },

      ingredients: [
        {
          id: 7,
          quantity: 15,
          interactionTimes: 1,
          ingredientNeededStatus: "SLICED",
          ingredient: {
            id: 1,
            name: "Tomate",
            image: "url",
            assetName: "tomato",
          },
        },

        {
          id: 5,
          quantity: 1,
          interactionTimes: 1,
          ingredientNeededStatus: "CHOPPED",
          ingredient: {
            id: 2,
            name: "Cebola",
            image: "url",
            assetName: "onion",
          },
        },

        {
          id: 6,
          quantity: 1,
          interactionTimes: 1,
          ingredientNeededStatus: "CHOPPED",
          ingredient: {
            id: 3,
            name: "Dente de alho",
            image: "url",
            assetName: "garlic",
          },
        },

        {
          id: 4,
          quantity: 1,
          interactionTimes: 5,
          ingredientNeededStatus: "WHOLE",
          ingredient: {
            id: 3,
            name: "Dente de alho",
            image: "url",
            assetName: "garlic",
          },
        },
      ],
    },

    {
      id: 4,
      positionOrder: 4,
      score: 0,
      action: {
        id: 4,
        name: "Cozinhar",
      },

      ingredients: [
        {
          id: 9,
          quantity: 1,
          interactionTimes: 5,
          ingredientNeededStatus: "WHOLE",
          ingredient: {
            id: 6,
            name: "Sal",
            image: "url",
            assetName: "salt",
          },
        },

        {
          id: 8,
          quantity: 1,
          interactionTimes: 5,
          ingredientNeededStatus: "WHOLE",
          ingredient: {
            id: 6,
            name: "Sal",
            image: "url",
            assetName: "salt",
          },
        },
      ],
    },
  ],
};

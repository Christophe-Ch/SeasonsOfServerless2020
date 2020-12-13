module.exports = async function (context, req) {
  const weight = parseInt(req.query.weight || (req.body && req.body.weight));

  let status;
  let body;

  if (weight && weight > 0) {
    status = 200;
    body = generateRecipe(weight);
  } else {
    status = 400;
    body = {
      errorMessage:
        "Please provide a weight and make sure that its value is numeric and greater than 0.",
    };
  }

  context.res = {
    status,
    body,
  };
};

function generateRecipe(weight) {
  return {
    ingredients: {
      groundLamb: {
        quantity: weight,
        unit: "kilo",
      },
      mincedSmallOnion: {
        quantity: weight / 2,
        unit: "unit",
      },
      mincedClovesGarlic: {
        quantity: weight * 2,
        unit: "unit",
      },
      dividedGroundCumin: {
        quantity: (weight * 1.5) / 2,
        unit: "teaspoon",
      },
      dividedGroundSumac: {
        quantity: (weight * 1.5) / 2,
        unit: "teaspoon",
      },
      salt: {
        quantity: weight / 4,
        unit: "teaspoon",
      },
      groundBlackPepper: {
        quantity: weight / 8,
        unit: "teaspoon",
      },
      redPepperFlakes: {
        quantity: weight / 8,
        unit: "teaspoon",
      },
    },
    others: {
      servings: (weight * 2.205 * 4).toFixed(), // kg * 2.205 => pound
      length: {
        value: (weight * 105) / 2,
        unit: "inch",
      },
    },
  };
}

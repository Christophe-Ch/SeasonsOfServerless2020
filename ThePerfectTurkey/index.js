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
      salt: {
        quantity: 0.05 * weight,
        unit: "cup",
      },
      water: {
        quantity: 0.66 * weight,
        unit: "gallon",
      },
      brownSugar: {
        quantity: 0.13 * weight,
        unit: "cup",
      },
      shallots: {
        quantity: 0.2 * weight,
        unit: "entity",
      },
      clovesOfGarlic: {
        quantity: 0.4 * weight,
        unit: "entity",
      },
      wholePeppercorns: {
        quantity: 0.13 * weight,
        unit: "tablespoon",
      },
      driedJuniperBerries: {
        quantity: 0.13 * weight,
        unit: "tablespoon",
      },
      freshRosemary: {
        quantity: 0.13 * weight,
        unit: "tablespoon",
      },
      thyme: {
        quantity: 0.06 * weight,
        unit: "tablespoon",
      },
    },
    times: {
      brine: {
        value: 2.4 * weight,
        unit: "hour",
      },
      roast: {
        value: 15 * weight,
        unit: "minute",
      },
    },
  };
}

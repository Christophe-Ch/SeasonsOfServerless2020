const predictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

const predictor_credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Prediction-key": process.env.CUSTOM_VISION_KEY },
});

const predictor = new predictionApi.PredictionAPIClient(
  predictor_credentials,
  process.env.CUSTOM_VISION_ENDPOINT
);

module.exports = async function (context, req) {
  const imageUrl = req.query.url || req.body.url;

  const response = {};

  if (imageUrl) {
    try {
      const result = await predictor.classifyImageUrl(
        process.env.CUSTOM_VISION_PROJECT_ID,
        "lovelyladoos",
        {
          url: imageUrl,
        }
      );

      let prediction;
      result.predictions.forEach((p) => {
        if (!prediction || prediction.probability < p.probability) {
          prediction = p;
        }
      });

      response.body = {
        prediction: prediction.tagName,
        probability: prediction.probability,
        details: result.predictions,
      };
    } catch (error) {
      response.status = 400;
      response.body = {
        message: "An error has occured",
        error: error.code,
      };
    }
  } else {
    response.status = 400;
    response.body = "Please provide a valid image url.";
  }

  context.res = response;
};

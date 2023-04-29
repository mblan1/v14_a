const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.openAiApi
});

const openAI = new OpenAIApi(configuration);

module.exports = openAI;

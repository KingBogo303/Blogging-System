import axios from "axios";

const URL = "https://api.openai.com/v1/moderations";
const OPENAI_API_KEY = "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";

export const moderateContent = async (text) => {
  try {
    const data = await axios({
      method: "post",
      url: URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: {
        input: text,
      },
    });
    const { flagged } = data.data.results[0];
    console.log(data.data.results[0]);
    return flagged;
  } catch (err) {
    console.log(err);
  }
};

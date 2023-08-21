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
    return flagged;
  } catch (err) {
    console.log(err);
  }
};

import axios from "axios";

const API_URL = "https://word-count-analyzer.onrender.com/api/insights";

export const fetchInsights = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addInsight = async (url) => {
  try {
    const response = await axios.post(API_URL, { url });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to analyze website"
    );
  }
};

export const deleteInsight = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const toggleFavorite = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/favorite`);
  return response.data;
};

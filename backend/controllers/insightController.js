import Insight from "../models/Insight.js";
import { getWordCount, extractLinks } from "../utils/scraper.js";

const getInsights = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "URL is required" });

    const wordCount = await getWordCount(url);
    const { webLinks, mediaLinks, domainName } = await extractLinks(url);

    let insight = await Insight.findOne({ url });

    if (insight) {
      insight.wordCount = wordCount;
      insight.webLinks = webLinks;
      insight.mediaLinks = mediaLinks;
      insight.domainName = domainName;
      await insight.save();
    } else {
      insight = new Insight({
        url,
        domainName,
        wordCount,
        webLinks,
        mediaLinks,
      });
      await insight.save();
    }

    res.status(200).json(insight);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to analyze website" });
  }
};

const listInsights = async (req, res) => {
  try {
    const insights = await Insight.find().sort({ createdAt: -1 });
    res.status(200).json(insights);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to fetch insights" });
  }
};

const removeInsight = async (req, res) => {
  try {
    const { id } = req.params;
    await Insight.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to delete insight" });
  }
};

const markFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const insight = await Insight.findById(id);
    if (!insight) return res.status(404).json({ message: "Not found" });

    insight.favorite = !insight.favorite;
    await insight.save();
    res.status(200).json(insight);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "Failed to update favorite" });
  }
};

export { getInsights, listInsights, removeInsight, markFavorite };

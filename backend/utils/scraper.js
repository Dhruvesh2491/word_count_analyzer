import axios from "axios";
import * as cheerio from "cheerio";
import { URL } from "url";

export const getWordCount = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const text = $("body").text().replace(/\s+/g, " ").trim();
    const words = text.split(" ").filter((word) => word.length > 0);
    return words.length;
  } catch (error) {
    console.error("Word count error:", error.message);
    throw new Error("Failed to fetch website content.");
  }
};

export const extractLinks = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const domainName = new URL(url).hostname;
    const webLinks = new Set();
    const mediaLinks = new Set();

    $("a").each((_, element) => {
      try {
        const href = $(element).attr("href");
        if (href) {
          const absoluteUrl = new URL(href, url).href;
          webLinks.add(absoluteUrl);
        }
      } catch (e) {
        console.warn("Invalid URL found:", href);
      }
    });

    $("img, video, audio, source").each((_, element) => {
      try {
        const src = $(element).attr("src");
        if (src) {
          const absoluteUrl = new URL(src, url).href;
          mediaLinks.add(absoluteUrl);
        }
      } catch (e) {
        console.warn("Invalid media URL found:", src);
      }
    });

    return {
      domainName,
      webLinks: [...webLinks].slice(0, 5),
      mediaLinks: [...mediaLinks].slice(0, 3),
    };
  } catch (error) {
    console.error("Link extraction error:", error.message);
    return { domainName: "", webLinks: [], mediaLinks: [] };
  }
};

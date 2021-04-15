import { rest } from "msw";
import { albumFeed } from "./albums";
import { songFeed } from "./songs";

export const handlers = [
  rest.get(
    "https://itunes.apple.com/us/rss/topalbums/limit=100/json",
    (req, res, ctx) => {
      return res(ctx.json(albumFeed));
    }
  ),
  rest.get(
    "https://itunes.apple.com/us/rss/topsongs/limit=100/json",
    (req, res, ctx) => {
      return res(ctx.json(songFeed));
    }
  ),
];

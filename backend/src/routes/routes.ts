import { Request, Response, Router } from "express";
import fs from "fs";
import path from "path";
import { User, Video } from "../types";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const dbPath = path.resolve(__dirname, "../../../src/db/db.json");

router.get("/api/user/:name", (req: Request, res: Response) => {
  const userName = req.params.name.toLowerCase();

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error reading file" });
      return;
    }

    try {
      const parsedData = JSON.parse(data);

      if (!Array.isArray(parsedData.users)) {
        res.status(500).json({ message: "Unexpected JSON structure" });
        return;
      }

      const users: User[] = parsedData.users;

      const user = users.find((u) => u.name.toLowerCase() === userName);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (parseError) {
      res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
});

router.post("/api/user/:name/videos", (req: Request, res: Response) => {
  const userName = req.params.name.toLowerCase();
  const newVideo: Video = req.body;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading users file" });
    }

    try {
      const parsedData = JSON.parse(data);

      if (!Array.isArray(parsedData.users)) {
        res.status(500).json({ message: "Unexpected JSON structure" });
        return;
      }

      const users: User[] = parsedData.users;

      const userIndex = users.findIndex(
        (user) => user.name.toLowerCase() === userName
      );

      if (userIndex !== -1) {
        if (!users[userIndex].videos) {
          users[userIndex].videos = [];
        }

        const videoAlreadyExists = users[userIndex].videos.some(
          (video) => video.id === newVideo.id
        );

        if (videoAlreadyExists) {
          res.status(403).json({ message: "Video already exists" });
          return;
        }

        users[userIndex].videos.push(newVideo);

        fs.writeFile(
          dbPath,
          JSON.stringify({ users: users }, null, 2),
          (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error writing to users file" });
            }
            res
              .status(200)
              .json({ message: "Video added successfully", data: newVideo });
          }
        );
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (parseError) {
      res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
});

router.post("/api/user/:name/videos/:id", (req: Request, res: Response) => {
  const userName = req.params.name.toLowerCase();
  const videoId = req.params.id;
  const { title: newVideoTitle } = req.body as { title: string };

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading users file" });
    }

    try {
      const parsedData = JSON.parse(data);

      if (!Array.isArray(parsedData.users)) {
        res.status(500).json({ message: "Unexpected JSON structure" });
        return;
      }

      const users: User[] = parsedData.users;

      const userIndex = users.findIndex(
        (user) => user.name.toLowerCase() === userName
      );

      if (userIndex !== -1) {
        const videoAlreadyExists = users[userIndex].videos.some(
          (video) => video.id === videoId
        );

        if (!videoAlreadyExists) {
          res.status(404).json({ message: "Video not found" });
          return;
        }

        const videoIndex = users[userIndex].videos.findIndex(
          (video) => video.id === videoId
        );

        users[userIndex].videos[videoIndex].title = newVideoTitle;

        fs.writeFile(
          dbPath,
          JSON.stringify({ users: users }, null, 2),
          (err) => {
            if (err) {
              return res
                .status(500)
                .json({ message: "Error writing to users file" });
            }
            res.status(200).json({
              message: "Video updated successfully",
              data: newVideoTitle,
            });
          }
        );
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (parseError) {
      res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
});

export default router;

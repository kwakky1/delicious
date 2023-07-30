import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/lib/database";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    clientPromise
      .then((client) => {
        client
          .db("breezm")
          .collection("staff")
          .findOne({ _id: new ObjectId("64c5ee7adf1fa3a578cbabf3") })
          .then((data) => {
            res.status(200).json(data);
          });
      })
      .catch((e) => {
        new Error(e);
      });
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch staff List" });
  }
};

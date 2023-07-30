import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../src/lib/database";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, staff } = req.body;

    console.log(staff);

    clientPromise
      .then((client) => {
        client
          .db("breezm")
          .collection("staff")
          .updateOne(
            { _id: new ObjectId(id) },
            {
              $set: {
                staff,
              },
            }
          );

        res.status(200).json({ success: true });
      })
      .catch((e) => {
        new Error(e);
      });
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch staff List" });
  }
};

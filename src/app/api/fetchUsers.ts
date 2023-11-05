import type { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";
import { ListUsersResponse } from "@notionhq/client/build/src/api-endpoints";

export interface UserType {
  id: string;
  name: string;
  img: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });
  try {
    const response = (await notion.users.list({
      page_size: 100,
    })) as ListUsersResponse;
    const userInfo = response.results.map((user) => {
      const { id, name, avatar_url } = user;
      return {
        id,
        name,
        img: avatar_url,
      } as UserType;
    });
    res.status(200).json(userInfo);
  } catch (e) {
    res.status(500).json({ error: "Unable to fetch user List" });
  }
};

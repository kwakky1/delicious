import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });
    const { page_id, properties } = req.body;
    const response = await notion.pages.update({
      page_id,
      properties,
    });
    if ("properties" in response) {
      const result = Object.entries(response.properties).map((field) => {
        switch (field[1].type) {
          case "title":
            return [field[0], field[1].title[0].plain_text];
          case "rich_text":
            return [field[0], field[1].rich_text[0]?.plain_text || ""];
          case "files":
            const imgUrlList = field[1].files
              .map((file) => {
                if (file.type === "file") {
                  return file.file.url;
                }
                return null;
              })
              .filter((url) => url !== null);
            return [field[0], imgUrlList];
          case "people":
            const pickerList = field[1].people
              .map((person) => {
                if ("type" in person) {
                  return { id: person.id, label: person.name };
                }
                return null;
              })
              .filter((url) => url !== null);
            return [field[0], pickerList];
          case "phone_number":
            return [field[0], field[1].phone_number];
          case "select":
            return [field[0], field[1].select?.name];
          case "checkbox":
            return [field[0], field[1].checkbox];
          default:
            return null;
        }
      });
      const list = Object.fromEntries(result as any);
      list.id = page_id;
      res.status(200).json(list);
    }
  } catch (err) {
    res.status(500).json({ error: "restaurant update error" });
  }
};

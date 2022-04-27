import { NextApiRequest, NextApiResponse } from "next";
import { Client } from "@notionhq/client";

// restaurant

export interface RestaurantType {
  name: string;
  type: string;
  address: string;
  phone: string;
  delivery: boolean;
  visit: boolean;
  picker: string[];
  review: string;
  img: string[];
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.query({
      database_id: databaseId as string,
    });
    response.results.shift();
    const result = response.results.map((row, index) => {
      if ("properties" in row) {
        const rowObj = Object.entries(row.properties).map((field) => {
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
                    return person.name;
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
        return Object.fromEntries(rowObj as any);
      }
    }) as RestaurantType[];
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "restaurant fetch error" });
  }
};

import { RestaurantType } from "../../../pages/api/restaurant/fetch";

interface MakePropertiesProps {
  field: string;
  data: RestaurantType;
}

const makeProperties = ({ field, data }: MakePropertiesProps) => {
  switch (field) {
    case "review":
      return {
        review: {
          rich_text: [
            {
              text: {
                content: data.review,
              },
            },
          ],
        },
      };
    case "picker":
      return {
        picker: {
          people: data.picker.map((pick) => {
            return { object: "user", id: pick.id };
          }),
        },
      };
    default:
      return null;
  }
};

export default makeProperties;

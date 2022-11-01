import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { getCollectionTopicError } from "./helpers";
import { useTranslation } from "react-i18next";

interface Props {
  register: UseFormRegister<FormFields>;
  errors: FieldErrorsImpl<{
    topic: string;
    }>
};

interface Collection {
  name: string;
  topic: string;
  description: string;
  image_url: string;
}

type FormFields = Pick<
  Collection,
  "name" | "topic" | "description" | "image_url"> &
{
  additional_fields: {
    name: string;
    type: string
  }[]
};

function ListOfTopics(props: Props) {
  const { t } = useTranslation();
  const topicList = [
    t("books"),
    t("alkohol"),
    t("movies"),
    t("greenery"),
    t("vehicles"),
    t("jewellery"),
    t("outfit"),
    t("memories"),
    t("other")
  ];
    return (
    <TextField
      id="topic"
      select
      fullWidth
      label={t("select-topic")}
      {...props.register("topic", { required: true })}
      error={!!props.errors.topic}
      helperText={getCollectionTopicError(props.errors)}
         >
      {topicList.map((topic) => (
        <MenuItem key={topic} value={topic}>
          {topic}
        </MenuItem>
      ))}
    </TextField>
  )
};

export default ListOfTopics;
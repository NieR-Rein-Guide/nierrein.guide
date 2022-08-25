import { CDN_URL } from "@config/constants";
import { Autocomplete, Box, TextField } from "@mui/material";
import { character } from "@prisma/client";
import { useSettingsStore } from "@store/settings";
import { useRouter } from "next/router";

interface CostumeSelectRow {
  title: string;
  character: character;
  slug: string;
  image_path_base: string;
  release_time: Date;
}

export default function CostumeSelect({
  costumes,
}: {
  costumes: CostumeSelectRow[];
}): JSX.Element {
  const router = useRouter();
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  function onSelect(costume: CostumeSelectRow) {
    if (!costume) return;
    router.push(`/characters/${costume.character.slug}/${costume.slug}`);
  }

  return (
    <Autocomplete
      onChange={(e, value) => onSelect(value as CostumeSelectRow)}
      className="w-full md:w-72"
      options={costumes.filter((costume) => {
        if (showUnreleasedContent) return true;
        return new Date() > new Date(costume.release_time);
      })}
      autoHighlight
      groupBy={(costume) => costume.character.name}
      getOptionLabel={(option) =>
        typeof option === "object" && `${option.title} ${option.character.name}`
      }
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="40"
            src={`${CDN_URL}${option.image_path_base}battle.png`}
          />
          {option.title}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search costume..."
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

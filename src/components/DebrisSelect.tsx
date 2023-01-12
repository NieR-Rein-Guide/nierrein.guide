import { Autocomplete, Box, TextField } from "@mui/material";
import { debris } from "@prisma/client";
import { useSettingsStore } from "@store/settings";
import classNames from "classnames";
import DebrisThumbnail from "./DebrisThumbnail";

export default function DebrisSelect({
  debris,
  onSelect = () => undefined,
  label = "Search debris...",
  classes = "w-full md:w-72",
  defaultValue = null,
}: {
  debris: debris[];
  onSelect?: (e, debris: debris) => void;
  label?: string;
  classes?: string | string[];
  defaultValue?: debris;
}): JSX.Element {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  return (
    <Autocomplete
      value={defaultValue}
      onChange={onSelect}
      className={classNames(classes)}
      options={debris
        .sort(
          (a, b) => -b.description_short?.localeCompare(a?.description_short)
        )
        .filter((thought) => {
          if (showUnreleasedContent) return true;
          return new Date() > new Date(thought.release_time);
        })}
      autoHighlight
      getOptionLabel={(option) =>
        typeof option === "object" && getDebrisLabel(option.name)
      }
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <div className="flex flex-col">
            <DebrisThumbnail sizeClasses="h-10 w-10" {...option} />
            <div>
              <p className="text-xl">{getDebrisLabel(option.name)}</p>
              <p className="text-grey-detail">{option.description_long}</p>
            </div>
          </div>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

function getDebrisLabel(name: string) {
  return name.split("Debris:")[1].replace(" Chunk", "");
}

import { CDN_URL } from "@config/constants";
import { Autocomplete, Box, TextField } from "@mui/material";
import { weapon } from "@prisma/client";
import { useSettingsStore } from "@store/settings";
import classNames from "classnames";

type WeaponSelectRow = weapon & {
  weapon_ability_link: (weapon_ability_link & {
    weapon_ability: weapon_ability;
  })[];
  weapon_skill_link: (weapon_skill_link & {
    weapon_skill: weapon_skill;
  })[];
  weapon_stat: weapon_stat[];
};

function defaultOnSelect(e, weapon: WeaponSelectRow) {
  if (!weapon) return;
  // @ts-expect-error location
  window.location = `/weapons/${weapon.slug}`;
}

export default function WeaponSelect({
  weapons,
  onSelect = defaultOnSelect,
  label = "Search weapons...",
  classes = "w-full md:w-72",
}: {
  weapons: WeaponSelectRow[];
  onSelect?: (e, weapon: WeaponSelectRow) => void;
  label?: string;
  classes?: string | string[];
}): JSX.Element {
  const showUnreleasedContent = useSettingsStore(
    (state) => state.showUnreleasedContent
  );

  return (
    <Autocomplete
      onChange={onSelect}
      className={classNames(classes)}
      options={weapons.filter((weapon) => {
        if (showUnreleasedContent) return true;
        return new Date() > new Date(weapon.release_time);
      })}
      autoHighlight
      groupBy={(weapon) => weapon.weapon_type}
      getOptionLabel={(option) =>
        typeof option === "object" && `${option.name}`
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
            src={`${CDN_URL}${option.image_path}standard.png`}
          />
          {option.name}
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

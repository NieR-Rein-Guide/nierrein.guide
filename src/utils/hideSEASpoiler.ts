import { SEA_DATE_DIFFERENCE } from "@config/constants";

export function hideSEASpoiler(release_time: string | Date) {
  return (
    new Date().getTime() - new Date(release_time).getTime() >=
    SEA_DATE_DIFFERENCE
  );
}

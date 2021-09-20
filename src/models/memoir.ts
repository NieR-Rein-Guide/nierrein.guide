import { getMemoirs } from "@libs/mongo";
import jsonMemoirs from "../data/parts.json";
import jsonAbilities from "../data/ability.json";

async function getAllMemoirs() {
  const allMemoirs = await getMemoirs();

  allMemoirs.series.forEach(serie => {
    serie.name = jsonMemoirs["series"]["name"]?.[serie.MemoirSeriesId]?.[
            "text_"
          ] ?? ''

    serie.abilities = serie.Ability.map(ability => ({
      ...ability,
      name: jsonAbilities["name"]?.[ability.NameAbilityTextId]?.["text_"] ?? '',
      description: jsonAbilities["description"]["long"]?.[ability.DescriptionAbilityTextId]?.[
            "text_"
          ] ?? ''
    }))
  })

  allMemoirs.individuals.forEach((memoir) => {
    const memoirSerie = allMemoirs.series.find(
      (serie) => serie.MemoirSeriesId === memoir.MemoirSeriesId
    );

    const addMemoir = {
      ...memoir,
      name: jsonMemoirs["group"]["name"]?.[memoirSerie.MemoirSeriesId]?.[
            "text_"
          ] ?? '',
      description: jsonMemoirs["group"]["description"]?.[memoirSerie.MemoirSeriesId]?.[
            "text_"
          ] ?? '',
    }

    if (memoirSerie["memoirs"]) {
      memoirSerie["memoirs"].push(addMemoir);
      return;
    }

    memoirSerie["memoirs"] = [addMemoir];
  });

  return allMemoirs
}

export {
  getAllMemoirs
}
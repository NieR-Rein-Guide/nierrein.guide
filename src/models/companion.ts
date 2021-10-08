import { getCompanions } from "@libs/mongo";
import jsonSkills from '../data/skill.json';
import jsonAbilities from "../data/ability.json";
import jsonCompanions from "../data/companion.json";

async function getAllCompanions() {
  const companions = await getCompanions()

  companions.forEach(companion => {
    companion.name = jsonCompanions["name"]?.[companion.ActorAssetId]?.[
              "text_"
            ] ?? ''

    companion.abilities = companion.Ability[0].AbilityDetail.map(ability => ({
      ...ability,
      name: jsonAbilities["name"]?.[ability.NameAbilityTextId]?.["text_"] ?? '',
      description: jsonAbilities["description"]["long"]?.[ability.DescriptionAbilityTextId]?.[
            "text_"
          ] ?? ''
    }))

    companion.skills = companion.Skill.map(skill => ({
      ...skill,
      name: jsonSkills["name"]?.[skill.NameSkillTextId]?.["text_"] ?? '',
      description: jsonSkills["description"]["long"]?.[skill.DescriptionSkillTextId]?.[
            "text_"
          ] ?? ''
    }))
  })

  return companions
}

export {
  getAllCompanions
}
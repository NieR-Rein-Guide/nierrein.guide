import atkIcon from "../../public/stats/atk.png";
import agilityIcon from "../../public/stats/agility.png";
import cdIcon from "../../public/stats/cd.png";
import crIcon from "../../public/stats/cr.png";
import defIcon from "../../public/stats/def.png";
import hpIcon from "../../public/stats/hp.png";
import evasionIcon from "../../public/stats/evasion.png";

const statsIcons = {
  atk: atkIcon,
  agility: agilityIcon,
  agi: agilityIcon,
  cd: cdIcon,
  crit_atk: cdIcon,
  cr: crIcon,
  crit_rate	: crIcon,
  def: defIcon,
  vit: defIcon,
  hp: hpIcon,
  eva_rate: evasionIcon,
  "AGILITY": agilityIcon,
  "HP": hpIcon,
  "ATTACK": atkIcon,
  "VITALITY": defIcon,
  "CRITICAL_RATIO": crIcon
};

export default statsIcons;
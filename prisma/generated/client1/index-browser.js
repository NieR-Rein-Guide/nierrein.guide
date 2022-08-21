
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.15.2
 * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
 */
Prisma.prismaVersion = {
  client: "3.15.2",
  engine: "461d6a05159055555eb7dfb337c9fb271cbd4d7e"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.CharacterScalarFieldEnum = makeEnum({
  character_id: 'character_id',
  slug: 'slug',
  name: 'name',
  image_path: 'image_path'
});

exports.Prisma.Character_rank_bonusScalarFieldEnum = makeEnum({
  rank_bonus_id: 'rank_bonus_id',
  rank_bonus_level: 'rank_bonus_level',
  character_id: 'character_id',
  description: 'description',
  stat: 'stat',
  type: 'type',
  amount: 'amount'
});

exports.Prisma.CompanionScalarFieldEnum = makeEnum({
  companion_id: 'companion_id',
  attribute: 'attribute',
  type: 'type',
  release_time: 'release_time',
  name: 'name',
  story: 'story',
  image_path_base: 'image_path_base'
});

exports.Prisma.Companion_abilityScalarFieldEnum = makeEnum({
  ability_id: 'ability_id',
  ability_level: 'ability_level',
  name: 'name',
  description: 'description',
  image_path_base: 'image_path_base'
});

exports.Prisma.Companion_ability_linkScalarFieldEnum = makeEnum({
  companion_id: 'companion_id',
  companion_level: 'companion_level',
  ability_id: 'ability_id',
  ability_level: 'ability_level'
});

exports.Prisma.Companion_skillScalarFieldEnum = makeEnum({
  skill_id: 'skill_id',
  skill_level: 'skill_level',
  cooldown_time: 'cooldown_time',
  name: 'name',
  description: 'description',
  short_description: 'short_description',
  image_path: 'image_path'
});

exports.Prisma.Companion_skill_linkScalarFieldEnum = makeEnum({
  companion_id: 'companion_id',
  companion_level: 'companion_level',
  skill_id: 'skill_id',
  skill_level: 'skill_level'
});

exports.Prisma.Companion_statScalarFieldEnum = makeEnum({
  companion_id: 'companion_id',
  level: 'level',
  atk: 'atk',
  hp: 'hp',
  vit: 'vit'
});

exports.Prisma.CostumeScalarFieldEnum = makeEnum({
  costume_id: 'costume_id',
  character_id: 'character_id',
  emblem_id: 'emblem_id',
  weapon_type: 'weapon_type',
  rarity: 'rarity',
  release_time: 'release_time',
  is_ex_costume: 'is_ex_costume',
  slug: 'slug',
  title: 'title',
  description: 'description',
  image_path_base: 'image_path_base'
});

exports.Prisma.Costume_abilityScalarFieldEnum = makeEnum({
  ability_id: 'ability_id',
  ability_level: 'ability_level',
  name: 'name',
  description: 'description',
  image_path_base: 'image_path_base'
});

exports.Prisma.Costume_ability_linkScalarFieldEnum = makeEnum({
  costume_id: 'costume_id',
  ability_slot: 'ability_slot',
  ability_id: 'ability_id',
  ability_level: 'ability_level'
});

exports.Prisma.Costume_skillScalarFieldEnum = makeEnum({
  skill_id: 'skill_id',
  skill_level: 'skill_level',
  gauge_rise_speed: 'gauge_rise_speed',
  cooldown_time: 'cooldown_time',
  name: 'name',
  description: 'description',
  short_description: 'short_description',
  image_path: 'image_path'
});

exports.Prisma.Costume_skill_linkScalarFieldEnum = makeEnum({
  costume_id: 'costume_id',
  skill_id: 'skill_id',
  skill_level: 'skill_level'
});

exports.Prisma.Costume_statScalarFieldEnum = makeEnum({
  costume_id: 'costume_id',
  level: 'level',
  agi: 'agi',
  atk: 'atk',
  crit_atk: 'crit_atk',
  crit_rate: 'crit_rate',
  eva_rate: 'eva_rate',
  hp: 'hp',
  vit: 'vit'
});

exports.Prisma.EmblemScalarFieldEnum = makeEnum({
  emblem_id: 'emblem_id',
  name: 'name',
  main_message: 'main_message',
  small_messages: 'small_messages',
  image_path: 'image_path'
});

exports.Prisma.MemoirScalarFieldEnum = makeEnum({
  memoir_id: 'memoir_id',
  lottery_id: 'lottery_id',
  rarity: 'rarity',
  release_time: 'release_time',
  name: 'name',
  story: 'story',
  image_path_base: 'image_path_base',
  memoir_series_id: 'memoir_series_id'
});

exports.Prisma.Memoir_seriesScalarFieldEnum = makeEnum({
  memoir_series_id: 'memoir_series_id',
  name: 'name',
  small_set_description: 'small_set_description',
  large_set_description: 'large_set_description'
});

exports.Prisma.WeaponScalarFieldEnum = makeEnum({
  weapon_id: 'weapon_id',
  evolution_group_id: 'evolution_group_id',
  evolution_order: 'evolution_order',
  weapon_type: 'weapon_type',
  rarity: 'rarity',
  attribute: 'attribute',
  is_ex_weapon: 'is_ex_weapon',
  release_time: 'release_time',
  slug: 'slug',
  name: 'name',
  image_path: 'image_path'
});

exports.Prisma.Weapon_abilityScalarFieldEnum = makeEnum({
  ability_id: 'ability_id',
  ability_level: 'ability_level',
  name: 'name',
  description: 'description',
  image_path_base: 'image_path_base'
});

exports.Prisma.Weapon_ability_linkScalarFieldEnum = makeEnum({
  weapon_id: 'weapon_id',
  slot_number: 'slot_number',
  ability_id: 'ability_id',
  ability_level: 'ability_level'
});

exports.Prisma.Weapon_skillScalarFieldEnum = makeEnum({
  skill_id: 'skill_id',
  skill_level: 'skill_level',
  cooldown_time: 'cooldown_time',
  name: 'name',
  description: 'description',
  short_description: 'short_description',
  image_path: 'image_path'
});

exports.Prisma.Weapon_skill_linkScalarFieldEnum = makeEnum({
  weapon_id: 'weapon_id',
  slot_number: 'slot_number',
  skill_id: 'skill_id',
  skill_level: 'skill_level'
});

exports.Prisma.Weapon_statScalarFieldEnum = makeEnum({
  weapon_id: 'weapon_id',
  level: 'level',
  atk: 'atk',
  hp: 'hp',
  vit: 'vit'
});

exports.Prisma.Weapon_storyScalarFieldEnum = makeEnum({
  id: 'id',
  story: 'story'
});

exports.Prisma.Weapon_story_linkScalarFieldEnum = makeEnum({
  weapon_id: 'weapon_id',
  weapon_story_id: 'weapon_story_id'
});

exports.Prisma.DebrisScalarFieldEnum = makeEnum({
  debris_id: 'debris_id',
  rarity: 'rarity',
  release_time: 'release_time',
  name: 'name',
  image_path_base: 'image_path_base'
});

exports.Prisma.NotificationScalarFieldEnum = makeEnum({
  notification_id: 'notification_id',
  information_type: 'information_type',
  title: 'title',
  body: 'body',
  release_time: 'release_time',
  thumbnail_path: 'thumbnail_path'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});


exports.Prisma.ModelName = makeEnum({
  character: 'character',
  character_rank_bonus: 'character_rank_bonus',
  companion: 'companion',
  companion_ability: 'companion_ability',
  companion_ability_link: 'companion_ability_link',
  companion_skill: 'companion_skill',
  companion_skill_link: 'companion_skill_link',
  companion_stat: 'companion_stat',
  costume: 'costume',
  costume_ability: 'costume_ability',
  costume_ability_link: 'costume_ability_link',
  costume_skill: 'costume_skill',
  costume_skill_link: 'costume_skill_link',
  costume_stat: 'costume_stat',
  emblem: 'emblem',
  memoir: 'memoir',
  memoir_series: 'memoir_series',
  weapon: 'weapon',
  weapon_ability: 'weapon_ability',
  weapon_ability_link: 'weapon_ability_link',
  weapon_skill: 'weapon_skill',
  weapon_skill_link: 'weapon_skill_link',
  weapon_stat: 'weapon_stat',
  weapon_story: 'weapon_story',
  weapon_story_link: 'weapon_story_link',
  debris: 'debris',
  notification: 'notification'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

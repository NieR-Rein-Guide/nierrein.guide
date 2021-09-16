"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getAllCostumes = void 0;
var mongo_1 = require("@libs/mongo");
var ability_json_1 = require("../data/ability.json");
var skill_json_1 = require("../data/skill.json");
var costume_json_1 = require("../data/costume.json");
var character_json_1 = require("../data/character.json");
var s3_1 = require("@libs/s3");
var p_memoize_1 = require("p-memoize");
var getCostumeLevelsByRarity_1 = require("@utils/getCostumeLevelsByRarity");
var weapon_1 = require("@models/weapon");
var calcStats_1 = require("@utils/calcStats");
function getAllCostumes(_a) {
    var _b = _a.allStats, allStats = _b === void 0 ? false : _b;
    return __awaiter(this, void 0, void 0, function () {
        var _c, costumes, charactersSheet, weapons, weaponsSheet, allCostumes;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        mongo_1.getCostumes(),
                        s3_1.sheets.get("characters"),
                        mongo_1.getWeapons(),
                        s3_1.sheets.get('weapons')
                    ])];
                case 1:
                    _c = _d.sent(), costumes = _c[0], charactersSheet = _c[1], weapons = _c[2], weaponsSheet = _c[3];
                    allCostumes = costumes.map(function (costume) {
                        var metadata = charactersSheet.find(function (character) { return character.id === costume.CostumeId; });
                        var finalCostume = {
                            ids: {
                                library: costume.CatalogTermId,
                                costume: costume.CostumeId,
                                character: costume.CharacterId,
                                emblem: costume.CostumeEmblemAssetId,
                                actor: costume.ActorAssetId,
                                material: costume.CostumeLimitBreakMaterialId
                            },
                            character: {
                                en: getCostumeCharacter(costume.CharacterId)
                            },
                            costume: {
                                name: {
                                    en: getCostumeName(costume.ActorAssetId)
                                },
                                description: {
                                    en: getCostumeDescription(costume.ActorAssetId)
                                },
                                emblem: getCostumeEmblem(costume.CostumeEmblemAssetId),
                                weapon: null,
                                weaponType: costume.WeaponType,
                                rarity: costume.RarityType,
                                stats: allStats ? getAllStats(costume) : getStats(costume)
                            },
                            abilities: getAbilities(costume),
                            skills: getSkills(costume),
                            metadata: metadata
                        };
                        var weaponCostume = weaponsSheet.find(function (weapon) { return weapon.characterTitle === finalCostume.costume.name.en; });
                        // This weapon belongs to a costume
                        if (weaponCostume) {
                            var weapon = weapons.find(function (weapon) { return weapon.BaseWeaponId === Number(weaponCostume.id); });
                            finalCostume.costume.weapon = __assign(__assign({}, weapon_1.getWeapon(weapon)), { metadata: weaponCostume });
                        }
                        return finalCostume;
                    });
                    return [2 /*return*/, JSON.parse(JSON.stringify(allCostumes))];
            }
        });
    });
}
function getAbilities(costume) {
    var abilities = costume.Ability.map(function (ability) {
        var ab = ability.AbilityDetail.map(function (detail) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return (__assign(__assign({}, detail), { name: (_c = (_b = (_a = ability_json_1["default"]["name"]) === null || _a === void 0 ? void 0 : _a[detail.NameAbilityTextId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '', description: {
                    short: (_f = (_e = (_d = ability_json_1["default"]["description"]["short"]) === null || _d === void 0 ? void 0 : _d[detail.DescriptionAbilityTextId]) === null || _e === void 0 ? void 0 : _e["text_"]) !== null && _f !== void 0 ? _f : '',
                    long: (_j = (_h = (_g = ability_json_1["default"]["description"]["long"]) === null || _g === void 0 ? void 0 : _g[detail.DescriptionAbilityTextId]) === null || _h === void 0 ? void 0 : _h["text_"]) !== null && _j !== void 0 ? _j : ''
                } }));
        });
        return __assign(__assign({}, ability), ab);
    });
    return abilities;
}
function getSkills(costume) {
    var abilities = costume.Skill.map(function (skill) {
        var ab = skill.SkillDetail.map(function (detail) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            return (__assign(__assign({}, detail), { name: (_c = (_b = (_a = skill_json_1["default"]["name"]) === null || _a === void 0 ? void 0 : _a[detail.NameSkillTextId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '', description: {
                    short: (_f = (_e = (_d = skill_json_1["default"]["description"]["short"]) === null || _d === void 0 ? void 0 : _d[detail.DescriptionSkillTextId]) === null || _e === void 0 ? void 0 : _e["text_"]) !== null && _f !== void 0 ? _f : '',
                    long: (_j = (_h = (_g = skill_json_1["default"]["description"]["long"]) === null || _g === void 0 ? void 0 : _g[detail.DescriptionSkillTextId]) === null || _h === void 0 ? void 0 : _h["text_"]) !== null && _j !== void 0 ? _j : ''
                } }));
        });
        return __assign(__assign({}, skill), ab);
    });
    return abilities;
}
function getStats(costume) {
    var _a = getCostumeLevelsByRarity_1["default"](costume.RarityType), base = _a.base, maxNoAsc = _a.maxNoAsc, maxWithAsc = _a.maxWithAsc;
    var otherStats = {
        agility: 1000,
        cr: 10,
        cd: 150
    };
    var firstAbilityStatsNoAsc = costume.Ability[0].AbilityDetail[0].AbilityStatus;
    var firstAbilityStatsWithAsc = costume.Ability[0].AbilityDetail[3].AbilityStatus;
    var secondAbilityStatsWithAsc = costume.Ability[1].AbilityDetail[3].AbilityStatus;
    var baseStats = __assign({ hp: calcStats_1["default"](base, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](base, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](base, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxNoAscensionStats = __assign({ hp: calcStats_1["default"](maxNoAsc, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](maxNoAsc, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](maxNoAsc, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxWithAscensionStats = __assign({ hp: calcStats_1["default"](maxWithAsc, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](maxWithAsc, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](maxWithAsc, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var stats = {
        base: {
            base: baseStats,
            displayed: {
                hp: Math.floor(baseStats.hp * (1 + (firstAbilityStatsNoAsc.Hp / 1000))),
                atk: Math.floor(baseStats.atk * (1 + (firstAbilityStatsNoAsc.Attack / 1000))),
                def: Math.floor(baseStats.def * (1 + (firstAbilityStatsNoAsc.Vitality / 1000))),
                agility: Math.floor(baseStats.agility * (1 + (firstAbilityStatsNoAsc.Agility / 1000))),
                cr: Math.floor(baseMaxNoAscensionStats.cr + (firstAbilityStatsNoAsc.CriticalRatioPermil / 10)),
                cd: Math.floor(baseMaxNoAscensionStats.cd + (firstAbilityStatsNoAsc.CriticalAttackRatioPermil / 10))
            }
        },
        maxNoAscension: {
            base: baseMaxNoAscensionStats,
            displayed: {
                hp: Math.floor(baseMaxNoAscensionStats.hp * (1 + (firstAbilityStatsNoAsc.Hp / 1000))),
                atk: Math.floor(baseMaxNoAscensionStats.atk * (1 + (firstAbilityStatsNoAsc.Attack / 1000))),
                def: Math.floor(baseMaxNoAscensionStats.def * (1 + (firstAbilityStatsNoAsc.Vitality / 1000))),
                agility: Math.floor(baseMaxNoAscensionStats.agility * (1 + (firstAbilityStatsNoAsc.Agility / 1000))),
                cr: Math.floor(baseMaxNoAscensionStats.cr + (firstAbilityStatsNoAsc.CriticalRatioPermil / 10)),
                cd: Math.floor(baseMaxNoAscensionStats.cd + (firstAbilityStatsNoAsc.CriticalAttackRatioPermil / 10))
            }
        },
        maxWithAscension: {
            base: baseMaxWithAscensionStats,
            displayed: {
                // Calculating first and second ability (2nd ability is unlocked after ascension) It is just in case 2 abilities influences the same stat
                hp: Math.floor(baseMaxWithAscensionStats.hp * (1 + (firstAbilityStatsWithAsc.Hp / 1000)) * (1 + (secondAbilityStatsWithAsc.Hp / 1000))),
                atk: Math.floor(baseMaxWithAscensionStats.atk * (1 + (firstAbilityStatsWithAsc.Attack / 1000)) * (1 + (secondAbilityStatsWithAsc.Attack / 1000))),
                def: Math.floor(baseMaxWithAscensionStats.def * (1 + (firstAbilityStatsWithAsc.Vitality / 1000)) * (1 + (secondAbilityStatsWithAsc.Vitality / 1000))),
                agility: Math.floor(baseMaxWithAscensionStats.agility * (1 + (firstAbilityStatsWithAsc.Agility / 1000)) * (1 + (secondAbilityStatsWithAsc.Agility / 1000))),
                cr: Math.floor(baseMaxWithAscensionStats.cr + (firstAbilityStatsWithAsc.CriticalRatioPermil / 10) + (secondAbilityStatsWithAsc.CriticalRatioPermil / 10)),
                cd: Math.floor(baseMaxWithAscensionStats.cd + (firstAbilityStatsWithAsc.CriticalAttackRatioPermil / 10) + (secondAbilityStatsWithAsc.CriticalAttackRatioPermil / 10))
            }
        }
    };
    return stats;
}
function getAllStats(costume) {
    var otherStats = {
        agility: 1000,
        cr: 10,
        cd: 150
    };
    var baseStats = __assign({ hp: calcStats_1["default"](1, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](1, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](1, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxNoAscensionStats = __assign({ hp: calcStats_1["default"](70, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](70, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](70, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxNoAscensionStats50 = __assign({ hp: calcStats_1["default"](50, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](50, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](50, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxNoAscensionStats60 = __assign({ hp: calcStats_1["default"](60, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](60, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](60, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxWithAscensionStats75 = __assign({ hp: calcStats_1["default"](75, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](75, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](75, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxWithAscensionStats80 = __assign({ hp: calcStats_1["default"](80, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](80, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](80, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxWithAscensionStats85 = __assign({ hp: calcStats_1["default"](85, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](85, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](85, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var baseMaxWithAscensionStats = __assign({ hp: calcStats_1["default"](90, costume.StatusCalculation.HpFunction.Parameters), atk: calcStats_1["default"](90, costume.StatusCalculation.AttackFunction.Parameters), def: calcStats_1["default"](90, costume.StatusCalculation.VitalityFunction.Parameters) }, otherStats);
    var stats = {
        1: {
            base: baseStats
        },
        50: {
            base: baseMaxNoAscensionStats50
        },
        60: {
            base: baseMaxNoAscensionStats60
        },
        70: {
            base: baseMaxNoAscensionStats
        },
        75: {
            base: baseMaxWithAscensionStats75
        },
        80: {
            base: baseMaxWithAscensionStats80
        },
        85: {
            base: baseMaxWithAscensionStats85
        },
        90: {
            base: baseMaxWithAscensionStats
        }
    };
    return stats;
}
function getCostumeName(ActorAssetId) {
    var _a, _b, _c;
    return (_c = (_b = (_a = costume_json_1["default"]["name"]) === null || _a === void 0 ? void 0 : _a[ActorAssetId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '';
}
function getCostumeDescription(ActorAssetId) {
    var _a, _b, _c;
    return (_c = (_b = (_a = costume_json_1["default"]["description"]) === null || _a === void 0 ? void 0 : _a[ActorAssetId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '';
}
function getCostumeCharacter(CharacterId) {
    var _a, _b, _c;
    return (_c = (_b = (_a = character_json_1["default"]["name"]) === null || _a === void 0 ? void 0 : _a[CharacterId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '';
}
function getCostumeEmblem(CostumeEmblemAssetId) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    var paddedId = CostumeEmblemAssetId.toString().padStart(3, "0");
    return {
        name: (_c = (_b = (_a = costume_json_1["default"]["emblem"]["name"]) === null || _a === void 0 ? void 0 : _a[CostumeEmblemAssetId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '',
        production: {
            name: (_f = (_e = (_d = costume_json_1["default"]["emblem"]["production"]["name"]) === null || _d === void 0 ? void 0 : _d[paddedId]) === null || _e === void 0 ? void 0 : _e["text_"]) !== null && _f !== void 0 ? _f : '',
            description: (_h = (_g = costume_json_1["default"]["emblem"]["production"]["result"]) === null || _g === void 0 ? void 0 : _g[paddedId]) !== null && _h !== void 0 ? _h : ''
        }
    };
}
var memGetAllCostumes = p_memoize_1["default"](getAllCostumes, {
    maxAge: 3600000
});
exports.getAllCostumes = memGetAllCostumes;

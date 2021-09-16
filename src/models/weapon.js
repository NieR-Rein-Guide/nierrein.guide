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
exports.getWeapon = exports.getSingleWeapon = exports.getAllWeapons = void 0;
var mongo_1 = require("@libs/mongo");
var ability_json_1 = require("../data/ability.json");
var skill_json_1 = require("../data/skill.json");
var weapon_json_1 = require("../data/weapon.json");
var s3_1 = require("@libs/s3");
var p_memoize_1 = require("p-memoize");
var calcStats_1 = require("@utils/calcStats");
var getWeaponLevelsByRarity_1 = require("@utils/getWeaponLevelsByRarity");
function getAllWeapons() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, weapons, weaponsSheet, allWeapons;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        mongo_1.getWeapons(),
                        s3_1.sheets.get("weapons")
                    ])];
                case 1:
                    _a = _b.sent(), weapons = _a[0], weaponsSheet = _a[1];
                    allWeapons = weapons.map(function (weapon) {
                        var metadata = weaponsSheet.find(function (sheetWeapon) { return sheetWeapon.id === weapon.BaseWeaponId; });
                        return __assign(__assign({}, getWeapon(weapon)), { metadata: metadata });
                    });
                    return [2 /*return*/, JSON.parse(JSON.stringify(allWeapons))];
            }
        });
    });
}
function getSingleWeapon(BaseWeaponId) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, weapons, weaponsSheet, weapon, metadata;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.all([
                        mongo_1.getWeapons(),
                        s3_1.sheets.get("weapons")
                    ])];
                case 1:
                    _a = _b.sent(), weapons = _a[0], weaponsSheet = _a[1];
                    weapon = weapons.find(function (weapon) { return weapon.BaseWeaponId === BaseWeaponId; });
                    if (!weapon) {
                        return [2 /*return*/, null];
                    }
                    metadata = weaponsSheet.find(function (sheetWeapon) { return sheetWeapon.id === weapon.BaseWeaponId; });
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return [2 /*return*/, __assign(__assign({}, getWeapon(weapon)), { metadata: metadata })];
            }
        });
    });
}
exports.getSingleWeapon = getSingleWeapon;
function getWeapon(weapon) {
    var data = {
        ids: {
            base: weapon.BaseWeaponId,
            asset: weapon.BaseAssetId,
            catalogSort: weapon.CatalogSortOrder,
            catalogId: weapon.CatalogTermId
        },
        name: {
            en: getWeaponName(weapon.BaseAssetId)
        },
        skills: getSkills(weapon.EvolutionStages),
        abilities: getAbilities(weapon.EvolutionStages),
        stories: getWeaponStories(weapon.EvolutionStages[weapon.EvolutionStages.length - 1].AssetId),
        evolutions: weapon.EvolutionStages,
        rarity: weapon.BaseRarityType,
        type: weapon.WeaponType,
        attribute: weapon.AttributeType,
        isDark: weapon.EvolutionStages.length > 2,
        isStory: weapon.IsRestrictDiscard == false && weapon.RarityType == "RARE",
        isRestrictDiscard: weapon.IsRestrictDiscard
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.stats = [];
    // First evolution stage
    data.evolutions.forEach(function (evolution, index) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data.stats.push(getStats({
            rarity: weapon.BaseRarityType,
            StatusCalculation: weapon.EvolutionStages[index].StatusCalculation,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            abilities: data.abilities[1]
        }));
    });
    return data;
}
exports.getWeapon = getWeapon;
function getWeaponName(AssetId) {
    var _a, _b, _c, _d;
    return (_d = (_c = (_b = (_a = weapon_json_1["default"]["name"]) === null || _a === void 0 ? void 0 : _a["wp" + AssetId]) === null || _b === void 0 ? void 0 : _b["1"]) === null || _c === void 0 ? void 0 : _c["text_"]) !== null && _d !== void 0 ? _d : '';
}
function getWeaponStories(AssetId) {
    var _a;
    var stories = (_a = weapon_json_1["default"]["story"]) === null || _a === void 0 ? void 0 : _a["wp" + AssetId];
    if (stories) {
        return Object.values(stories).map(function (a) { return a['text_']; });
    }
    return [];
}
function getSkills(EvolutionStages) {
    var allSkills = EvolutionStages.map(function (evolution) {
        return evolution.Skill.map(function (skill) { return skill.SkillDetail; });
    });
    var skills = allSkills.map(function (skills) {
        return skills.map(function (stage) {
            return stage.map(function (skill) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return (__assign(__assign({}, skill), { name: (_c = (_b = (_a = skill_json_1["default"]["name"]) === null || _a === void 0 ? void 0 : _a[skill.NameSkillTextId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '', description: {
                        short: (_f = (_e = (_d = skill_json_1["default"]["description"]["short"]) === null || _d === void 0 ? void 0 : _d[skill.DescriptionSkillTextId]) === null || _e === void 0 ? void 0 : _e["text_"]) !== null && _f !== void 0 ? _f : '',
                        long: (_j = (_h = (_g = skill_json_1["default"]["description"]["long"]) === null || _g === void 0 ? void 0 : _g[skill.DescriptionSkillTextId]) === null || _h === void 0 ? void 0 : _h["text_"]) !== null && _j !== void 0 ? _j : ''
                    } }));
            });
        });
    });
    return skills;
}
function getAbilities(EvolutionStages) {
    var allAbilities = EvolutionStages.map(function (evolution) {
        return evolution.Ability.map(function (skill) { return skill.AbilityDetail; });
    });
    var abilities = allAbilities.map(function (abs) {
        return abs.map(function (stage) {
            return stage.map(function (ab) {
                var _a, _b, _c, _d, _e, _f;
                return (__assign(__assign({}, ab), { name: (_c = (_b = (_a = ability_json_1["default"]["name"]) === null || _a === void 0 ? void 0 : _a["" + ab.NameAbilityTextId]) === null || _b === void 0 ? void 0 : _b["text_"]) !== null && _c !== void 0 ? _c : '', description: {
                        short: '',
                        long: (_f = (_e = (_d = ability_json_1["default"]["description"]["long"]) === null || _d === void 0 ? void 0 : _d[ab.DescriptionAbilityTextId]) === null || _e === void 0 ? void 0 : _e["text_"]) !== null && _f !== void 0 ? _f : ''
                    } }));
            });
        });
    });
    return abilities;
}
function getStats(_a) {
    var rarity = _a.rarity, StatusCalculation = _a.StatusCalculation, abilities = _a.abilities;
    var _b = getWeaponLevelsByRarity_1["default"](rarity), base = _b.base, maxNoAsc = _b.maxNoAsc, maxWithAsc = _b.maxWithAsc;
    var firstAbility = abilities[0][0];
    var secondAbilityMaxLvl = abilities[1][14];
    var baseStats = {
        hp: calcStats_1["default"](base, StatusCalculation.HpFunction.Parameters),
        atk: calcStats_1["default"](base, StatusCalculation.AttackFunction.Parameters),
        def: calcStats_1["default"](base, StatusCalculation.VitalityFunction.Parameters)
    };
    var baseMaxNoAscensionStats = {
        hp: calcStats_1["default"](maxNoAsc, StatusCalculation.HpFunction.Parameters),
        atk: calcStats_1["default"](maxNoAsc, StatusCalculation.AttackFunction.Parameters),
        def: calcStats_1["default"](maxNoAsc, StatusCalculation.VitalityFunction.Parameters)
    };
    var baseMaxWithAscensionStats = {
        hp: calcStats_1["default"](maxWithAsc, StatusCalculation.HpFunction.Parameters),
        atk: calcStats_1["default"](maxWithAsc, StatusCalculation.AttackFunction.Parameters),
        def: calcStats_1["default"](maxWithAsc, StatusCalculation.VitalityFunction.Parameters)
    };
    var stats = {
        base: {
            base: baseStats,
            displayed: {
                hp: Math.floor(baseStats.hp * (1 + (firstAbility.AbilityStatus.Hp / 1000))),
                atk: Math.floor(baseStats.atk * (1 + (firstAbility.AbilityStatus.Attack / 1000))),
                def: Math.floor(baseStats.def * (1 + (firstAbility.AbilityStatus.Vitality / 1000)))
            }
        },
        maxNoAscension: {
            base: baseMaxNoAscensionStats,
            displayed: {
                hp: Math.floor(baseMaxNoAscensionStats.hp * (1 + (firstAbility.AbilityStatus.Hp / 1000))),
                atk: Math.floor(baseMaxNoAscensionStats.atk * (1 + (firstAbility.AbilityStatus.Attack / 1000))),
                def: Math.floor(baseMaxNoAscensionStats.def * (1 + (firstAbility.AbilityStatus.Vitality / 1000)))
            }
        },
        maxWithAscension: {
            base: baseMaxWithAscensionStats,
            displayed: {
                hp: Math.floor(baseMaxWithAscensionStats.hp * (1 + (firstAbility.AbilityStatus.Hp / 1000)) * (1 + (secondAbilityMaxLvl.AbilityStatus.Hp / 1000))),
                atk: Math.floor(baseMaxWithAscensionStats.atk * (1 + (firstAbility.AbilityStatus.Attack / 1000)) * (1 + (secondAbilityMaxLvl.AbilityStatus.Attack / 1000))),
                def: Math.floor(baseMaxWithAscensionStats.def * (1 + (firstAbility.AbilityStatus.Vitality / 1000)) * (1 + (secondAbilityMaxLvl.AbilityStatus.Vitality / 1000)))
            }
        }
    };
    return stats;
}
var memGetAllWeapons = p_memoize_1["default"](getAllWeapons, {
    maxAge: 3600000
});
exports.getAllWeapons = memGetAllWeapons;

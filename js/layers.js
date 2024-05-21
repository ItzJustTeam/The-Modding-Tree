let info = {
    modFiles: ["layers.js", "tree.js"],
}

addLayer("s", {
    name: "stringify", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
	    points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "strings", // Name of prestige currency
    baseResource: "planck lenghts", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 13)) mult = mult.times(3)
        if (hasUpgrade('s', 14)) mult = mult.times(1.5)
        if (hasUpgrade('s', 23)) mult = mult.times(5)
        if (hasUpgrade('s', 24)) mult = mult.times(upgradeEffect('s', 24))
        if (hasUpgrade('q', 11)) mult = mult.times(1.75)
        if (hasMilestone('q', 0)) mult = mult.times(3)
        if (hasUpgrade('q', 12)) mult = mult.times(upgradeEffect('q', 12))
        if (hasMilestone('q', 1)) mult = mult.times(2.5)
        if (hasUpgrade('q', 13)) mult = mult.times(5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Reset for strings", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Universal Booster I",
            description: "Double your planck lenght gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Universal Booster II",
            description: "Triple your planck lenght gain.",
            cost: new Decimal(2),
        },
        13: {
            title: "Strings, STRINGS!",
            description: "x2.5 your string gain.",
            cost: new Decimal(8),
        },
        14: {
            title: "Strings and planck lenghts",
            description: "x1.5 your planck lenght and string gain.",
            cost: new Decimal(30),
        },
        21: {
            title: "funny booster ig",
            description: "Boost planck lenght gain based on strings",
            cost: new Decimal(75),
            effect() {
                return player[this.layer].points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        22: {
            title: "funny booster again",
            description: "Boost planck lenght gain based on planck lenght",
            cost: new Decimal(150),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        23: {
            title: "Universal Booster III",
            description: "x5 your string gain.",
            cost: new Decimal(500),
        },
        24: {
            title: "the last funny booster",
            description: "Boost string gain based on planck lenght",
            cost: new Decimal(2000),
            effect() {
                return player.points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    },
})

addLayer("q", {
    name: "quarkify", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: ["s"],
    color: "#32CD32",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "quarks", // Name of prestige currency
    baseResource: "strings", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Quark Booster I",
            description: "x1.75 your planck lenght and string gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Quark Booster II",
            description: "Boost string gain based on quarks",
            cost: new Decimal(4),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13: {
            title: "Quark Booster III",
            description: "x5 your string gain.",
            cost: new Decimal(35),
        },
    },
    milestones: {
        0: {
            requirementDescription: "2 Quarks",
            done() {return player.s.best = new Decimal(2)},
            effectDescription: "Triple your string gain.",
        },
        1: {
            requirementDescription: "10 Quarks",
            done() {return player.s.best = new Decimal(10)},
            effectDescription: "x2.5 your string gain.",
        },
    },
})

addLayer("av", {
    name: "advance", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AV", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    branches: ["s"],
    color: "#EFD936",
    requires() { return new Decimal(1e7) }, // Can be a function that takes requirement increases into account
    resource: "advancements", // Name of prestige currency
    baseResource: "strings", // Name of resource prestige is based on
    baseAmount() {return player.s.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Reset for advancements", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "More Planck Lenght",
            description: "Boost planck lenght gain based on quarks.",
            cost: new Decimal(1),
            effect() {
                return player.q.points.add(1).pow(0.75)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
    }
})

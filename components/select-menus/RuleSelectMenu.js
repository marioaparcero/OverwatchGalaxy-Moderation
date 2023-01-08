const { MessageActionRow, MessageSelectMenu } = require('discord.js');
const { Rules } = require('../../libraries/rules.json');

let rulesArray = [];

Rules.forEach(rule => {
    rulesArray.push({
        label: rule.id.toString(),
        emoji: rule.emoji,
        value: rule.id.toString(),
        description: rule.description,
    });
});

const RuleSelectMenu = (_punishment_type) => {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(`rule-select-${_punishment_type}`)
                .setPlaceholder(`${_punishment_type == 'soft' ?
                    'LEVE' : _punishment_type == 'serious' ?
                        'GRAVE' : _punishment_type == 'temporary' ?
                            'TEMPORAL' : 'PERMANENTE'
                    }`)
                .addOptions([rulesArray]),
        );
}

module.exports = { RuleSelectMenu };
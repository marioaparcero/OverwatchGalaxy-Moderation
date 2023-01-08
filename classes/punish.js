class Punisher {
    constructor(_discord_id, _display_name) {
        this._discord_id = _discord_id;
        this._display_name = _display_name.replace(/\s/g, '');
    }
}

class Punished {
    constructor(_discord_id, _display_name, _game_id) {
        this._discord_id = _discord_id;
        this._display_name = _display_name;
        this._game_id = _game_id;
    }
}

class Punishment {
    constructor(_id, _rule_id, _type, _date, _timestamp, _log_message_url) {
        this._id = _id;
        this._rule_id = _rule_id;
        this._type = _type;
        this._date = _date;
        this._timestamp = _timestamp;
        this._log_message_url = null;
    }
}

module.exports = {
    Punisher,
    Punished,
    Punishment
}
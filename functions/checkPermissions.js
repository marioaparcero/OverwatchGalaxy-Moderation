const Roles = require('../libraries/roles.json');

const checkPermissions = async (member_roles, range) => {
    let allowed = false;
    Object.values(Roles).forEach(async (role, index) => {
        if (member_roles.includes(role) && index + 1 <= range) {
            allowed = true;
        }
    });
    return allowed;
}

module.exports = {
    checkPermissions,
}
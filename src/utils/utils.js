export function getRoleNames(roles) {
    const roleNames = roles.map(role => {
        if (role.role_id === 1) {
            return "Admin";
        } else if (role.role_id === 2) {
            return "User";
        } else if (role.role_id === 3){
            return "Premium User";
        } else {
            return "";
        }
    });
    return roleNames.join(", ");
}
export const EMPLOYEE_ROLES = {
    GUEST: 0,
    EMPLOYEE: 1,
    MANAGER: 2,
}

export const employeeRoleToString = (role) => {
    switch (role) {
        case 0:
            return 'Клієнт';
        case 1:
            return 'Працівник';
        case 2:
            return 'Керівник';
        default:
            return '';
    }
}
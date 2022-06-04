import React from 'react';
import {Select} from "semantic-ui-react";
import {EMPLOYEE_ROLES} from "../../utils/constants/employee_roles";
import './styles.scss'

const EmployeeRolesSelector = ({role, onChange }) => {
    const roles = [
        { key: EMPLOYEE_ROLES.GUEST, value: EMPLOYEE_ROLES.GUEST, text: 'Гість' },
        { key: EMPLOYEE_ROLES.EMPLOYEE, value: EMPLOYEE_ROLES.EMPLOYEE, text: 'Працівник' },
        { key: EMPLOYEE_ROLES.MANAGER, value: EMPLOYEE_ROLES.MANAGER, text: 'Керівник' },
    ];

    return (
        <div className="EmployeeRolesSelector">
            <div className="label">Роль</div>
            <Select
                value={role}
                placeholder='Оберіть роль'
                options={roles}
                onChange={(e, data) => onChange(data.value)}
            />
        </div>
    );
};

export default EmployeeRolesSelector;
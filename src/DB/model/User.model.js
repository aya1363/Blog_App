import { DataTypes,ValidationError } from 'sequelize'
import { sequelize } from '../connection.db.js'



export const UserModel = sequelize.define('User', {
    id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            checkName(value) {
                if (value.length < 2) { throw new Error('user name length must be more than 2 characters') }
            }
        }
    
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    password: {
    type: DataTypes.STRING,
    allowNull: false,

}
    ,
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
    
}, {
    hooks: {
        beforeCreate: (user) => {
        checkPasswordLength(user)
    }
    }
}

)

function checkPasswordLength(user) {
    const string_pass = user.password?.toString();
        if (!string_pass || string_pass.length <= 6) {
            throw new ValidationError('Validation Error', [
    {
        message: 'Password must be longer than 6 characters',
        path: 'password', 
    },
    ]);
}
}

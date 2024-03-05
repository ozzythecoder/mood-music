import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10;

const encryptPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
    return bcrypt.hashSync(password, salt);
};

const comparePassword = (candidatePassword: string, storedPassword: string) => {
    console.log(candidatePassword, storedPassword);
    return bcrypt.compareSync(candidatePassword, storedPassword);
};

export default {
    encryptPassword,
    comparePassword,
};

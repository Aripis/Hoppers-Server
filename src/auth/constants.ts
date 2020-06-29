import * as dotenv from 'dotenv';
import * as fs from 'fs';

const data: any = dotenv.parse(fs.readFileSync(`.env`));

export const jwtConstants = {
    secret: data.JWT_SECRET,
};

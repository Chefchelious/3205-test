import { promises as fs } from 'fs';
import { IUser } from '../common/interfaces/types';

const pathName = './db.json';
let data: IUser[] = []

const fileDb = {
  async init() {
    try {
      await this.checkDbExists();
      const fileContents = await fs.readFile(pathName);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
        console.error(e);
        data = [];
    }
  },
  getUsers(query: IUser) {
    // return data.filter(user =>
    //   user.email.includes(query.email) &&
    //   (query.number ? user.number && user.number.includes(query.number) : true)
    // );
    return data.filter(user =>
      user.email === query.email &&
      (query.number ? user.number === query.number : true)
    );
  },
  async checkDbExists() {
    try {
      await fs.access(pathName);
    } catch (e: unknown) {
      if ((e as NodeJS.ErrnoException).code === 'ENOENT') {
        await fs.writeFile(pathName, JSON.stringify(data, null, 2));
      } else {
        throw e;
      }
    }
  }
}

export default fileDb;

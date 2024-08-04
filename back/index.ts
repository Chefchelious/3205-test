import express from 'express';
import cors from 'cors';
import fileDb from "./fileDb";
import { IUser } from '../common/interfaces/types';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/search-user', async (req, res) => {
  const { email, number } = req.body;

  setTimeout(async () => {
    try {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email' });
      }

      if (number && !/^\d{6}$/.test(number)) {
        return res.status(400).json({ message: 'Invalid number format' });
      }

      const query: IUser = { email, number };
      if (number) {
        query.number = number;
      }

      res.json(fileDb.getUsers(query));
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }, 5000);
})

const run = async () => {
  await fileDb.init();
  app.listen(port, () => {
    console.log(`port is running at ${port} port`);
  });
};

run().catch((e) => console.error(e));

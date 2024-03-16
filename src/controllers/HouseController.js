import * as yup from 'yup';
import House from '../models/House';
import User from '../models/User';

const schema = yup.object().shape({
  description: yup.string().required(),
  price: yup.number().required(),
  location: yup.string().required(),
  status: yup.boolean().required(),
});

class HouseController {
  async store(req, res) {
    const { filename } = req.file;
    const { user_id } = req.headers;
    const {
      description, price, location, status,
    } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const house = await House.create({
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json(house);
  }

  async update(req, res) {
    const { filename } = req.file;
    const { house_id } = req.params;
    const { user_id } = req.headers;
    const {
      description, price, location, status,
    } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Não autorizado!' });
    }

    await House.updateOne({ _id: house_id }, {
      user: user_id,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.send();
  }

  async destroy(req, res) {
    const { house_id } = req.params;
    const { user_id } = req.headers;

    const user = await User.findById(user_id);
    const house = await House.findById(house_id);

    if (String(user._id) !== String(house.user)) {
      return res.status(401).json({ error: 'Não autorizado!' });
    }

    await House.findByIdAndDelete({ _id: house_id });

    return res.send();
  }

  async index(req, res) {
    const { status } = req.query;

    const houses = await House.find({ status });

    if (!houses) {
      return res.status(400);
    }

    return res.json(houses);
  }
}

export default new HouseController();

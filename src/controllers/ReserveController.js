import Reserve from '../models/Reserve';
import House from '../models/House';

class ReserveController {
  async index(req, res) {
    const { user_id } = req.headers;

    const reserves = await Reserve.find({ user: user_id }).populate('house');

    return res.json(reserves);
  }

  async destroy(req, res) {
    const { user_id } = req.headers;
    const { reserve_id } = req.params;

    const reserve = await Reserve.findById(reserve_id);

    if (!reserve) {
      return res.status(404).json({ error: 'Reserva não encontrada!' });
    }

    if (String(user_id) !== String(reserve.user)) {
      return res.status(401).json({ error: 'Não autorizado!' });
    }

    await Reserve.findByIdAndDelete({ _id: reserve_id });

    return res.json();
  }

  async store(req, res) {
    const { house_id } = req.params;
    const { user_id } = req.headers;
    const { date } = req.body;

    const house = await House.findById(house_id);

    if (!house) {
      return res.status(404).json({ error: 'Casa não encontrada!' });
    }

    if (house.status !== true) {
      return res.status(400).json({ error: 'Casa não disponível!' });
    }

    if (String(user_id) === String(house.user)) {
      return res.status(401).json({ error: 'usuário não pode locar casa própria.' });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date,
    });

    return res.json(reserve);
  }
}

export default new ReserveController();

import * as yup from 'yup';
import User from '../models/User';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

class SessionController {
  async store(req, res) {
    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'E-mail inválido' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}

export default new SessionController();

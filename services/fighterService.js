const { FighterRepository } = require('../repositories/fighterRepository');

class FighterService {
  // TODO: Implement methods to work with fighters
  create(data) {
    const fighter = FighterRepository.create(data);
    if (!fighter) return 'Fighter save error';
    const fighterRequest = {
      name: fighter.name,
      power: fighter.power,
      defense: fighter.defense,
      health: fighter.health,
    };
    return fighterRequest;
  }

  search(search) {
    const fighter = FighterRepository.getOne(search);
    if (!fighter) return null;
    const queryResponse = {
      _id: fighter._id,
      name: fighter.name,
      power: fighter.power,
      defense: fighter.defense,
      health: fighter.health,
      source: fighter.source,
    };
    return queryResponse;
  }

  getAll() {
    const fighters = FighterRepository.getAll();
    const fightersResponse = fighters.map(fighter => ({
      _id: fighter._id,
      name: fighter.name,
      power: fighter.power,
      defense: fighter.defense,
      health: fighter.health,
      source: fighter.source,
      }));
    return fightersResponse;
  }

  delete(fighter) {
    const deleteFighter = FighterRepository.delete(fighter.id);
    if (Array.isArray(deleteFighter) && !deleteFighter.length) {
      return 'Fighter not found';
    }
    return 'Fighter deleted';
  }

  update(id, data) {
    const user = FighterRepository.update(id, data);
    return user;
  }

}

module.exports = new FighterService();
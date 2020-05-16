const { BaseRepository } = require('./baseRepository');

class FighterRepository extends BaseRepository {
    constructor() {
        super('fighters');
    }
    create(data) {
        data.id = this.generateId();
        const fighters = this.getAll();
        const lastFighter = fighters[fighters.length - 1];
        data._id = String(+lastFighter._id + 1);
        data.createdAt = new Date();
        const list = this.dbContext.push(data).write();
        return list.find(it => it.id === data.id);
    }
}

exports.FighterRepository = new FighterRepository();
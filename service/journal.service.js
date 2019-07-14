export class JournalService {
  constructor (auth, db){
    this._auth = auth;
    this._db = db;
  }
  getJournals(){
    return this._db.collection('user').doc('IKYzHMDKOL0iRPjkhNnu').collection('post').get();
  }
}

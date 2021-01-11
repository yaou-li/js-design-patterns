class DB {}

function getInstanceCreator() {
    let db = null;
    return function() {
        if (db === null) {
            db = new DB();
            db.constructor = null;
        }
        return db;
    }
}

export default {
    getDBInstance: getInstanceCreator()
}
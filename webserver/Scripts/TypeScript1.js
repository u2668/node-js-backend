"use strict";
class Database {
    addMessage(message) {
    }
}
exports.Database = Database;
class FakeDatabase {
    addMessage(message) {
        console.log(`Add message: ${message}`);
    }
}
exports.FakeDatabase = FakeDatabase;
//# sourceMappingURL=TypeScript1.js.map
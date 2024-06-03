

import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
    name: "otopark_db",//carpos_otopark_db
});


const dbTables = {
    users: "users",
    tokens: "tokens",
    deleteditems: "deleteditems",
    vehicleType: "vehicletype",
    settings: "settings",
    inCarParking: "incarparking",
    exitInCarParking: "exitincarparking",
    vtHours: "vt_hours",
    vtTariffs: "vt_tariffs",
}

//DELETE FROM users
//INSERT OR REPLACE INTO users (id,isLogin) VALUES (?,?)

export const createTables = () => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            //users
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${dbTables.users} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), companyName VARCHAR(100), password VARCHAR(100),isLogin VARCHAR(1), isLock VARCHAR(1))`,
                [],
                (sqlTxn, res) => {
                    //  return resolve(res)
                },
                error => {
                    //  return reject(error)
                },
            );
            //vehicle types
            txn.executeSql(`CREATE TABLE IF NOT EXISTS ${dbTables.vehicleType} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))`)
            //Tariffs
            txn.executeSql(`CREATE TABLE IF NOT EXISTS ${dbTables.vtTariffs} (id INTEGER PRIMARY KEY AUTOINCREMENT, vehicle_type_id INTEGER, hour_id INTEGER, price REAL)`)
            //Hours
            txn.executeSql(`CREATE TABLE IF NOT EXISTS ${dbTables.vtHours} (id INTEGER PRIMARY KEY AUTOINCREMENT, hour2 INTEGER)`)
            //settings
            txn.executeSql(`CREATE TABLE IF NOT EXISTS ${dbTables.settings} (id INTEGER PRIMARY KEY AUTOINCREMENT, addressLine1 VARCHAR(200), addressLine2 VARCHAR(200), addressLine3 VARCHAR(200), phoneNumber VARCHAR(100), carInPrint INTEGER(1), carOutPrint INTEGER(1))`)
            //inCarParking
            txn.executeSql(`CREATE TABLE IF NOT EXISTS ${dbTables.inCarParking} (id INTEGER PRIMARY KEY AUTOINCREMENT, plate VARCHAR(200), date VARCHAR(100), vehicleType INTEGER)`)
            //exitInCarParking
            txn.executeSql(`CREATE TABLE IF NOT EXISTS ${dbTables.exitInCarParking} (id INTEGER PRIMARY KEY AUTOINCREMENT, plate VARCHAR(200), date VARCHAR(100), vehicleType INTEGER, exitDate VARCHAR(100), price VARCHAR(100))`)
            return resolve()
        });
    })
};

export const addUser = (name, companyName, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${dbTables.users} (name,companyName,password,isLogin,isLock) VALUES (?,?,?,0,0)`,
                [name, companyName, password],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const updateUserIsLogin = (id, isLogin) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.users} SET isLogin = ? WHERE id = ?`,
                [isLogin, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};

export const updateUserLock = (id, isLock) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.users} SET isLock = ? WHERE id = ?`,
                [isLock, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};

export const updateUserPassword = (id, password) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.users} SET password = ? WHERE id = ?`,
                [password, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};

export const updateUserCompanyName = (id, companyName) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.users} SET companyName = ? WHERE id = ?`,
                [companyName, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};

export const getUsers = () => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM ${dbTables.users} ORDER BY id DESC`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    return resolve(results)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};

/**
VehicleType
 **/
export const getVehicleTypes = () => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${dbTables.vehicleType} ORDER BY id ASC`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    return resolve(results)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const addVehicleType = (name) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${dbTables.vehicleType} (name) VALUES (?)`,
                [name],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const updateVehicleType = (id, name) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.vehicleType} SET name = ? WHERE id = ?`,
                [name, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const deleteVehicleType = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM ${dbTables.vehicleType} WHERE id = ?`,
                [id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
/**
VehicleType END
 **/

/**
Vehicle Hour
 **/
export const getHours = () => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${dbTables.vtHours} ORDER BY id ASC`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    return resolve(results)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const addHour = (hour2) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${dbTables.vtHours} (hour2) VALUES (?)`,
                [hour2],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const updateHour = (id, hour2) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.vtHours} SET hour2 = ? WHERE id = ?`,
                [hour2, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const deleteHour = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM ${dbTables.vtHours} WHERE id = ?`,
                [id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
/**
Vehicle Hour END
 **/

/**
Vehicle Tariff
 **/
export const getTariff = () => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(`SELECT t.* ,vt.name as vehicleTypeName, vh.hour2
            FROM ${dbTables.vtTariffs} t
            INNER JOIN ${dbTables.vehicleType} vt
            ON t.vehicle_type_id=vt.id
            INNER JOIN ${dbTables.vtHours} vh
            ON t.hour_id=vh.id
            ORDER BY vh.hour2 ASC`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    return resolve(results)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const addTariff = (vehicle_type_id, hour_id, price) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${dbTables.vtTariffs} (vehicle_type_id,hour_id,price) VALUES (?,?,?)`,
                [vehicle_type_id, hour_id, price],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const updateTariff = (id, vehicle_type_id, hour_id, price) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.vtTariffs} SET vehicle_type_id=?,hour_id=?,price=? WHERE id = ?`,
                [vehicle_type_id, hour_id, price, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const deleteTariff = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM ${dbTables.vtTariffs} WHERE id = ?`,
                [id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
/**
Vehicle Tariff END
 **/

/**
settings
 **/
export const getSettings = () => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${dbTables.settings} LIMIT 1`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    if (len > 0) {
                        return resolve(res.rows.item(0))
                    } else {
                        return resolve(null)
                    }
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const addSettings = (addressLine1, addressLine2, addressLine3, phoneNumber, carInPrint, carOutPrint) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${dbTables.settings} (addressLine1,addressLine2,addressLine3,phoneNumber,carInPrint,carOutPrint) VALUES (?,?,?,?,?,?)`,
                [addressLine1, addressLine2, addressLine3, phoneNumber, carInPrint, carOutPrint],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const updateSettings = (id, addressLine1, addressLine2, addressLine3, phoneNumber, carInPrint, carOutPrint) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `UPDATE ${dbTables.settings} SET addressLine1=?, addressLine2=?, addressLine3=?, phoneNumber=?,carInPrint=?, carOutPrint=? WHERE id = ?`,
                [addressLine1, addressLine2, addressLine3, phoneNumber, carInPrint, carOutPrint, id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
/**
settings END
 **/

/**
inCarParking
 **/
export const getInCarParking = (orderBy = 'ASC') => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${dbTables.inCarParking} ORDER BY id ${orderBy}`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    return resolve(results)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const getInCarParkingByPlate = (plate) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${dbTables.inCarParking} WHERE plate = ?`,
                [plate],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            return resolve(item)
                        }
                    } else {
                        return resolve(null)
                    }
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const addInCarParking = (plate, date, vehicleType) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${dbTables.inCarParking} (plate, date, vehicleType) VALUES (?,?,?)`,
                [plate, date, vehicleType],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const deleteInCarParkingById = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `DELETE FROM ${dbTables.inCarParking} WHERE id = ?`,
                [id],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
/**
inCarParking END
 **/

/**
exitInCarParking
 **/
export const addExitInCarParking = (plate, date, vehicleType, exitDate, price) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(
                `INSERT INTO ${dbTables.exitInCarParking} (plate, date, vehicleType, exitDate, price) VALUES (?,?,?,?,?)`,
                [plate, date, vehicleType, exitDate, price],
                (sqlTxn, res) => {
                    return resolve(res)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
export const getExitInCarParking = (from, to, orderBy = 'ASC',) => {
    return new Promise((resolve, reject) => {
        db.transaction(txn => {
            txn.executeSql(`SELECT * FROM ${dbTables.exitInCarParking} WHERE exitDate BETWEEN '${from}' AND '${to}' ORDER BY id ${orderBy}`,
                [],
                (sqlTxn, res) => {
                    let len = res.rows.length;
                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    return resolve(results)
                },
                error => {
                    return reject(error)
                },
            );
        });
    })
};
/**
exitInCarParking END
 **/


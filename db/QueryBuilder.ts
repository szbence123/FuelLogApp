import { Database } from "expo-sqlite";

export const executeQuery = <T>(db: Database, query: string, params: any[] = []): Promise<T> => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                query,
                params,
                (_, result) => {
                    const data: T = result.rows._array as unknown as T;
                    console.log(data);
                    resolve(data);
                },
                error => { 
                    console.log('SQL Error', error); 
                    reject(false);
                    return false
                }
            );
        });
    });
};
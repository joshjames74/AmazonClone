import createProductTableQuery from "./productTable";
import createCustomerTableQuery from "./customerTable";
import createSellerTableQuery from "./sellerTable";
import createUserTableQuery from "./userTable";
import { CreateTableQueryType } from "./types/createTableQueryType";
import conn from '../../db';


export default function createAllTablesQuery(): void {

    const ifNotExists = true;
    const getProps = (table: string): CreateTableQueryType => {
        return {
            createStatement: `CREATE TABLE ${ifNotExists ? 'IF NOT EXISTS' : ''}`,
            table: table,
        }
    };

    const table_names = {
        userTable: 'user_table',
        productTable: 'product_table',
        customerTable: 'customer_table',
        sellerTable: 'seller_table'
    }

    // This is the order in which queries need to be executed
    const userQuery = createUserTableQuery(getProps(table_names.userTable));
    const sellerQuery = createSellerTableQuery(getProps(table_names.userTable), table_names.userTable)
    const productQuery = createProductTableQuery(getProps(table_names.productTable), table_names.sellerTable);
    const customerQuery = createCustomerTableQuery(getProps(table_names.customerTable), table_names.userTable);

    const commit = (query: string): void => {
        try {
            conn.query(query);
        } catch { (e: string) => console.log(e)}
    }

    commit(userQuery);
    commit(sellerQuery);
    commit(productQuery);
    commit(customerQuery);

}
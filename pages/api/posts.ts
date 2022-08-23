import conn from '../../db';

export default async (req: any, res: any) => {
    try {
        const query = 'SELECT * FROM posts'
        const result = await conn.query(query);
        console.log("ttt", result);
        return result.rows[0];
    } catch (error) {
        console.log(error);
    }
};

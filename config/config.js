/**
 * Created by hungtruong on 3/1/17.
 */
let env = process.env.NODE_ENV || 'development';

switch (env) {
    case 'development':
        process.env.PORT = 3000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/Shippers';
        break;
    case 'test':
        process.env.PORT = 4000;
        process.env.MONGODB_URI = 'mongodb://localhost:27017/ShippersTest';
        break;
}
import { Sequelize } from 'sequelize';

class PostgresWrapper {
  private _sequelize = new Sequelize(process.env.DATABASE_URL!);

  get sequelize() {
    if (!this._sequelize) {
      throw new Error('Postgres database connection failed:');
    }
    return this._sequelize;
  }

  connect() {
    this._sequelize
      .authenticate()
      .then(() => {
        console.log(
          'Postgres DB connection has been established successfully.'
        );
      })
      .catch((error) =>
        console.error('Unable to connect to the database:', error)
      );
  }
}

// since we create and export the instace, it will act like a singleton
export const postgresWrapper = new PostgresWrapper();

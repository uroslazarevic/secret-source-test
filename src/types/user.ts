export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
}

export class User implements IUser {
  id;
  name;
  email;
  email_ve;
  password;
  created_at;
  updated_at;
  constructor(source: IUser) {
    /**
     * User ID
     */
    this.id = source.id;

    /**
     * User name
     */
    this.name = source.name;

    /**
     * Email address
     */
    this.email = source.email;

    /**
     * Bcrypt-ed password hash
     */
    this.password = source.password;

    /**
     * @type {Date}
     */
    this.created_at = source.created_at;

    /**
     * @type {Date}
     */
    this.updated_at = source.updated_at;
  }
}

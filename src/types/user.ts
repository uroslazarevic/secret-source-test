export interface IUser {
  id: string;
  email: string;
  password: string;
  created_at: string;
}

export class User implements IUser {
  id;
  email;
  email_ve;
  password;
  created_at;
  constructor(source: IUser) {
    /**
     * User ID
     */
    this.id = source.id;

    /**
     * Email address, uniquely identifies user in the system
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
  }
}

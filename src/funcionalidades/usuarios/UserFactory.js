// funcionalidades/usuarios/UserFactory.js

class User {
    constructor(firstName, lastName, email, password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
  }
  
  class Proveedor extends User {
    constructor(firstName, lastName, email, password) {
      super(firstName, lastName, email, password);
      this.role = 'proveedor';
    }
  }
  
  class Empresa extends User {
    constructor(firstName, lastName, email, password) {
      super(firstName, lastName, email, password);
      this.role = 'empresa';
    }
  }
  
  class UserFactory {
    static createUser(accountType, firstName, lastName, email, password) {
      switch (accountType) {
        case 'proveedor':
          return new Proveedor(firstName, lastName, email, password);
        case 'empresa':
          return new Empresa(firstName, lastName, email, password);
        default:
          throw new Error('Tipo de cuenta no válido');
      }
    }
  }
  
  export default UserFactory;
  
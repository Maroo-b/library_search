
type LoginCredentials = {
  username: string;
  password: string;
};

export const mockUser: LoginCredentials = {
  username: 'test',
  password: 'test',
};



export const isValidUser = (username: string, password: string): boolean => {
    if (username === mockUser.username && password === mockUser.password) {
    //   setIsAuthenticated(true);
      return true
    } else {
    //   setIsAuthenticated(false);
      return false
    }
};
declare namespace Express {
  interface Request {
    usuario: {
      id: number;
      nome: string;
      email: string;
    };
  }
}

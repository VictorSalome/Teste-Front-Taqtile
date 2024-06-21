

export const LoginPage = () => {
  return (
    <main>
      <header>
        <h1>Bem-vindo(a) à Taqtile!</h1>
      </header>
      <form>
        <div>
          <label>Email:</label>
          <input type="email"/>
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" />
        </div>

        <button type='submit'>Entrar</button>
      </form>
    </main>
  );
};

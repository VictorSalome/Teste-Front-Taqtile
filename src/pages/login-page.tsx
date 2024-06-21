import { useState } from "react";
import { IValidationLogin } from "../interfaces/interface-login";
import { validateEmail, validatePassword } from "../utils/validate-login";


export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<IValidationLogin>({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      console.log("Formulário válido. Dados podem ser enviados para o servidor.");
    }
   
  };




  return (
    <main>
      <header>
        <h1>Bem-vindo(a) à Taqtile!</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label>Senha:</label>
          <input
          type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
            {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button type='submit'>Entrar</button>
      </form>
    </main>
  );
};

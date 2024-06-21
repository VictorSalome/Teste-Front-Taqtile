export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validateEmail = (email: string): string => { 
    if (!emailRegex.test(email)) {
      return "Email inválido, por favor insira um email valido!";
    }
    return "";
  };
  
  export const validatePassword = (password: string): string => {
    if (!passwordRegex.test(password)) {
      return "A senha deve ter pelo menos 8 caracteres, incluindo letras e números";
    }
    return "";
  };
  
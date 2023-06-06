import { Card, CardHeader, Heading,  CardBody, CardFooter, Input, Button, CircularProgress, FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IUserSignup } from '../../commons/interfaces';
import AuthService from '../../service/AuthService';
import { useForm } from "react-hook-form";

export function SignupPage() {
    
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IUserSignup>();
  
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (data: IUserSignup) => {
    const user: IUserSignup = {
      ...data,
    };
    AuthService.signup(user).then((Response) => {
      console.log(data);
      navigate("/login");
    })
    .catch((responseError) => {
      setApiError("Não foi possível criar o usuário!");
      console.log(data);
    })
  }

  return(
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card p={2}>
          <CardHeader p={0}>
              <Heading size='lg' className='text-center mt-2'>Cadastro de usuário</Heading>
          </CardHeader>
          
          <CardBody p={4}>
            <FormControl isInvalid={errors.username && true} mb={2}>
              <label>Informe seu username</label>
              <Input 
                type='text'
                id='username'
                placeholder='Informe seu username'
                {...register("username", {
                  required: "Campo Obrigatório",
                  minLength: {value: 4, message: "Seu username deve ter no mínimo 4 caracteres"},
                  maxLength: {value: 50, message: "Seu username pode ter no máximo 50 caracteres"}
                })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.displayName && true} mb={2}>
              <label>Como deseja ser chamado?</label>
              <Input 
                type='text'
                id='displayName'
                placeholder='Como deseja ser chamado?'
                {...register("displayName", {
                  required: "Campo obrigatório",
                  minLength: {value: 4, message: "Seu nome/apelido deve ter no mínimo 2 caracteres"},
                  maxLength: {value: 50, message: "Seu nome/apelido pode ter no máximo 80 caracteres"}
                })}
              />  

              <FormErrorMessage>
                {errors.displayName && errors.displayName.message}
              </FormErrorMessage>    
            </FormControl>

            <FormControl isInvalid={errors.password && true} mb={2}>
              <label>Informe sua senha</label>
              <Input 
                type='password'
                id='password'
                placeholder='Informe sua senha'
                {...register("password", {
                  required: "Campo Obrigatório",
                  minLength: {value: 4, message: "Sua senha deve ter no mínimo 6 caracteres"},
                  // pattern: {
                  //   value: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$",
                  //   message: "A senha deve conter no mímino 1 caractere maiúsculo",
                  // },
                })}
              />
            </FormControl>

            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage> 

            <div className='text-center'>
              {apiError && <div className="alert alert-danger">{apiError}</div>}
            </div>
          </CardBody>

          <CardFooter p={0}>
            <div className="text-center w-100">
              <Button 
                fontSize='sm'
                className='mb-2' 
                colorScheme='green'
                isLoading={isSubmitting}
                type='submit'
              >
                Cadastrar
              </Button>

              <div className="text-center mb-2">
                <span>já possui cadastro? </span>
                <Link to="/login" className='text-primary'>Autenticar-se</Link>
              </div>
            </div>
          </CardFooter>
        </Card> 
      </form> 
    </div>
  );
}
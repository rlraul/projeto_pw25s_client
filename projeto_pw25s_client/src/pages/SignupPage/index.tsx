import { Card, CardHeader, Heading,  CardBody, CardFooter, Input, Button, CircularProgress} from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IUserSignup } from '../../commons/interfaces';

export function SignupPage() {
    const [form, setForm] = useState({
        username: "",
        displayName: "",
        password: "",
    });

    const [apiError, setApiError] = useState(false);
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setForm((previousForm) => {
          return {
            ...previousForm,
            [name]: value,
          };
        });
        setApiError(false);
    };

    const onClickCadastrar = () => {
        const user: IUserSignup = {
          username: form.username,
          displayName: form.displayName,
          password: form.password,
        };
        setPendingApiCall(!pendingApiCall);
    }

    return(
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Card>
                <CardHeader>
                    <Heading size='lg' className='text-center'>Cadastro de usuário</Heading>
                </CardHeader>
                
                <CardBody>
                    <div className='m-2'>
                        <label>Informe seu username</label>
                        <Input 
                          type='text'
                          name='username'
                          placeholder='Informe seu username'
                          onChange={onChange}>
                        </Input>   
                    </div>
                    <div className='m-2'>
                        <label>Como deseja ser chamado?</label>
                        <Input 
                          type='text'
                          name='displayname'
                          placeholder='Como deseja ser chamado?'
                          onChange={onChange}>
                        </Input>   
                    </div>
                    <div className='m-2'>
                        <label>Informe sua senha</label>
                        <Input 
                          type='password'
                          name='password'
                          placeholder='Informe sua senha'
                          onChange={onChange}>
                        </Input>   
                    </div>
                </CardBody>
                <CardFooter>
                    <div>
                        <Button 
                          fontSize='sm'
                          className='m-2' 
                          colorScheme='green'
                          onClick={onClickCadastrar}
                        >
                            {pendingApiCall ? (<CircularProgress isIndeterminate size="20px" color="teal"></CircularProgress>) : ('Cadastrar')}
                        </Button>
                        <Button 
                          fontSize='sm'
                          className='m-2' 
                          colorScheme='blue'
                        >
                            Voltar
                        </Button>
                    </div>
                </CardFooter>
            </Card>  
        </div>
    );
}
import { Card, CardHeader, Heading,  CardBody, CardFooter, Divider, Stack, StackDivider, Input, Button, Center} from '@chakra-ui/react'

export function SignupPage() {


    return(
        <div className="d-flex align-items-center justify-content-center vh-100">
            <Card>
                <CardHeader>
                    <Heading size='lg' className='text-center'>Cadastro de usuário</Heading>
                </CardHeader>
                
                <CardBody>
                    <div className='m-2'>
                        <label>Informe seu username</label>
                        <Input type='text'></Input>   
                    </div>
                    <div className='m-2'>
                        <label>Como deseja ser chamado?</label>
                        <Input type='text'></Input>   
                    </div>
                    <div className='m-2'>
                        <label>Informe sua senha</label>
                        <Input type='password'></Input>   
                    </div>
                </CardBody>
                <CardFooter>
                    <div className=''>
                        <Button className='m-2' colorScheme='green'>Cadastrar</Button>
                        <Button className='m-2' colorScheme='blue'>Voltar</Button>
                    </div>
                </CardFooter>
            </Card>  
        </div>
    );
}
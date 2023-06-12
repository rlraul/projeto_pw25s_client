import './AccountListPage.css';
import { Link, useNavigate } from "react-router-dom";
import { IAccount } from "../../commons/interfaces";
import { useEffect, useState } from "react";
import AccountService from "../../service/AccountService";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Grid, GridItem, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import {
    BsPencilSquare,
    BsTrash3,
    BsThreeDotsVertical,
  } from "react-icons/bs";

export function AccountListPage() {

    const [data, setData] = useState<IAccount[]>([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = () => {
        AccountService.findAll()
        .then((response) => {
            setData(response.data);
            setApiError("");
        }).catch((responseError) => {
            setApiError(responseError.errors);
        });
    }

    const onEdit = (url: string) => {
        navigate(url);
    };
    
    const onRemove = (id: number) => {
        AccountService.remove(id)
        .then((response) => {
        loadData();
        setApiError("");
        })
        .catch((error) => {
        setApiError("Falha ao remover a conta.");
        });
    };
    
    return (
        <div className="container">
            <div className="text-center">
                <h3>Suas Contas</h3>
            </div>
            
            <div className="d-flex justify-content-end">
                <Link to="/accounts/new" className="btn btn-success">
                    Nova Conta
                </Link>
            </div> 

            <div className="d-flex justify-content-center">
                <div className="card-container">
                    {data.map((conta: IAccount) => (
                        <Card size={'lg'} variant={'outline'} m={2} maxW={200} w={200}>
                            <CardHeader pt={5} pb={0}>
                                <Heading size='sm' className='text-center'>{conta.name}</Heading>
                                <Divider />
                            </CardHeader>

                            <CardBody pt={0} pb={0}>
                                <div className="d-flex">
                                    <Text fontSize='sm' className="fw-bold" m={1}>Número:</Text>
                                    <Text fontSize='sm' m={1}>{conta.number}</Text>
                                </div>
                                <div className="d-flex">
                                    <Text fontSize='sm' className="fw-bold" m={1}>Agência:</Text>
                                    <Text fontSize='sm' m={1}>{conta.agency}</Text>
                                </div>
                                <div className="d-flex">
                                    <Text fontSize='sm' className="fw-bold" m={1}>Banco:</Text>
                                    <Text fontSize='sm' m={1}>{conta.bank}</Text>
                                </div>
                                <div className="d-flex">
                                    <Text fontSize='sm' className="fw-bold" m={1}>Saldo:</Text>
                                    <Text fontSize='sm' m={1}>{conta.amount}</Text>
                                </div>
                                <Divider />
                            </CardBody>

                            <CardFooter pt={0} pb={3}>
                            <Menu>
                                <MenuButton 
                                    as={IconButton}
                                    aria-label="Actions"
                                    icon={<BsThreeDotsVertical size={20} />}
                                    variant="ghost"
                                />
                                <MenuList>
                                    <MenuItem 
                                        icon={<BsPencilSquare />}
                                        onClick={() => onEdit(`/accounts/${conta.id}`)}
                                    >
                                        Editar
                                    </MenuItem>
                                    <MenuItem 
                                        icon={<BsTrash3 />}
                                        onClick={() => onRemove(conta.id!)}
                                    >
                                        Remover
                                    </MenuItem>
                                </MenuList>   
                            </Menu>
                            </CardFooter>
                        </Card> 
                    ))}
                </div>
            </div>   
        </div>
    );
}
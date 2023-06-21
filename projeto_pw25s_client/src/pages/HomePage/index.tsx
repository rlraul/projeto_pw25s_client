import './homePage.css';
import { Card, CardBody, CardHeader, Divider, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AccountService from "../../service/AccountService";
import { IAccount, IFinancialMovement } from "../../commons/interfaces";
import financialMovementService from "../../service/FinancialMovementService";

export function HomePage() {

    const [apiError, setApiError] = useState("");
    const [dataAccounts, setDataAccounts] = useState<IAccount[]>([]);
    const [dataLastDebits, setDataLastDebits] = useState<IFinancialMovement[]>([]);
    const [dataLastCredits, setDataLastCredits] = useState<IFinancialMovement[]>([]);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = () => {
        AccountService.findAll()
        .then((response) => {
            setDataAccounts(response.data);
            setApiError("");
        }).catch((responseError) => {
            setApiError('Erro ao buscar dados das contas:' + responseError.errors);
        });

        financialMovementService.findAllLastFiveCreditsMovements()
        .then((response) => {
            setDataLastCredits(response.data.content);
            setApiError("");
        }).catch((responseError) => {
            setApiError('Erro ao buscar dados dos créditos:' + responseError.errors);
        });

        financialMovementService.findAllLastFiveDebitsMovements()
        .then((response) => {
            setDataLastDebits(response.data.content);
            setApiError("");
        }).catch((responseError) => {
            setApiError('Erro ao buscar dados dos débitos:' + responseError.errors);
        });
    }

    return(
        <div className="homePage-content-container">
            <div className="text-center mb-2">
                <h1 className="row text-center">Controle Financeiro</h1> 
            </div>

            <div className='homePage-card-container'>
                <div className="mb-3">
                    <Card className='homePage-card'>
                        <CardHeader m={0} pb={2} className="text-center">
                            <h4>Saldo das contas</h4>
                        </CardHeader>
                        <CardBody pt={0}>
                            <TableContainer className='homePage-card-grid' style={{overflowY: "auto"}}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Conta</Th>
                                            <Th>Saldo</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataAccounts.map((conta: IAccount) => (
                                        <Tr>
                                            <Td>{conta.name}</Td>
                                            <Td>R${conta.amount.toFixed(2)}</Td>
                                        </Tr>
                                        ))}    
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </div>
            
                <div className="mb-3">
                    <Card className='homePage-card'>
                        <CardHeader m={0} pb={2} className="text-center">
                            <h4>5 Ultimas receitas</h4>
                        </CardHeader>
                        <CardBody pt={0}>
                            <TableContainer className='homePage-card-grid' style={{overflowY: "auto"}}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Conta</Th>
                                            <Th>Valor</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {dataLastCredits.map((creditMovement: IFinancialMovement) => (
                                        <Tr>
                                            <Td>{creditMovement.account.name}</Td>
                                            <Td>R${creditMovement.value.toFixed(2)}</Td>
                                        </Tr>
                                        ))}    
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </div>  

                <div className="mb-3">
                    <Card className='homePage-card'>
                        <CardHeader m={0} pb={2} className="text-center">
                            <h4>5 Ultimas despesas</h4>
                        </CardHeader>
                        <CardBody pt={0}>
                            <TableContainer className='homePage-card-grid' style={{overflowY: "auto"}}>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Conta</Th>
                                            <Th>Valor</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                    {dataLastDebits.map((debitMovement: IFinancialMovement) => (
                                        <Tr>
                                            <Td>{debitMovement.account.name}</Td>
                                            <Td>R${debitMovement.value.toFixed(2)}</Td>
                                        </Tr>
                                        ))}    
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </CardBody>
                    </Card>
                </div>  
            </div> 
        </div>
    );

}
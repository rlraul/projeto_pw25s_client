import { Card, CardBody, CardHeader, Divider, Text } from "@chakra-ui/react";
import bodyImg from "../../assets/stonks.png";
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
        <div className="container">
            <div className="text-center">
                <h1 className="row">Controle Financeiro</h1> 
            </div>

            <div className="d-flex justify-content-center">
                <div className="m-2">
                    <Card>
                        <CardHeader m={0} pb={2} className="text-center">
                            <h4>Saldo das contas</h4>
                            <Divider m={0}/>
                        </CardHeader>
                        <CardBody pt={0}>
                            {dataAccounts.map((conta: IAccount) => (
                                <div className="d-flex">
                                    <Text fontSize='sm' className="fw-bold" m={1}>{conta.name}:</Text>
                                    <Text fontSize='sm' m={1}>R${conta.amount.toFixed(2)}</Text>
                                </div>    
                            ))}
                        </CardBody>
                    </Card>
                </div>
            
                <div className="m-2">
                    <Card>
                        <CardHeader m={0} pb={2} className="text-center">
                            <h4>5 Ultimas receitas</h4>
                            <Divider m={0}/>
                        </CardHeader>
                        <CardBody pt={0}>
                            {dataLastCredits.map((creditMovement: IFinancialMovement) => (
                                <div className="d-flex">
                                    <Text fontSize='sm' className="fw-bold" m={1}>{creditMovement.account.name}:</Text>
                                    <Text fontSize='sm' className="fw-bold" m={1}>{creditMovement.type}:</Text>
                                    <Text fontSize='sm' m={1}>R${creditMovement.value.toFixed(2)}</Text>
                                </div>    
                            ))}
                        </CardBody>
                    </Card>
                </div>  

                <div className="m-2">
                    <Card>
                        <CardHeader m={0} pb={2} className="text-center">
                            <h4>5 Ultimas despesas</h4>
                            <Divider m={0}/>
                        </CardHeader>
                        <CardBody pt={0}>
                            {dataLastDebits.map((conta: IFinancialMovement) => (
                                <div className="d-flex">
                                    <Text fontSize='sm' className="fw-bold" m={1}>{conta.name}:</Text>
                                    <Text fontSize='sm' m={1}>R${conta.value.toFixed(2)}</Text>
                                </div>    
                            ))}
                        </CardBody>
                    </Card>
                </div>  
            </div> 
        </div>
    );

}
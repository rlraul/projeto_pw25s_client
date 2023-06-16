import { IconButton, Menu, MenuButton, MenuItem, MenuList, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BsCheckSquare,
    BsTrash3,
    BsThreeDotsVertical,
  } from "react-icons/bs";
import { IAccount, IFinancialMovement } from "../../commons/interfaces";
import financialMovementService from "../../service/FinancialMovementService";
import { format } from "date-fns";
import AccountService from "../../service/AccountService";

export function MovementListPage() {

    const [data, setData] = useState<IFinancialMovement[]>([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const [selectedAccount, setSelectedAccount] = useState('');
    const [accounts, setaccounts] = useState<IAccount[]>([]);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async () => {
        //Pega dados do Select de contas
        await AccountService.findAll()
            .then((response) => {
                setaccounts(response.data);
                setApiError("");
            })
            .catch((responseError) => {
                setApiError("Falha ao carregar lista de contas");
            });
        
        //Pega dados das movimentações
        financialMovementService.findAll()
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
        financialMovementService.remove(id)
          .then((response) => {
            loadData();
            setApiError("");
          })
          .catch((error) => {
            setApiError("Falha ao remover a movimentação.");
          });
      };

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        console.log(selectedValue);
        setSelectedAccount(selectedValue);
      
        if (selectedValue === '0') {
            financialMovementService.findAll()
                .then((response) => {
                    setData(response.data);
                    setApiError("");
                }).catch((responseError) => {
                    setApiError(responseError.errors);
                });
        } else {
            financialMovementService.findAllByAccountId(selectedValue)
                .then((response) => {
                    setData(response.data);
                    setApiError("");
                }).catch((responseError) => {
                    setApiError(responseError.errors);
                });
        }
    };
    
    return (
        <div className="container">
            <div className="text-center">
                <h3>Movimentações</h3>
            </div>
            
            <div className="d-flex justify-content-end">
                <div>
                    <Select onChange={handleSelectChange} value={selectedAccount}>
                        <option value="0">Selecione uma conta</option>
                        {accounts.map((account: IAccount) => (
                            <option 
                                key={account.id} 
                                value={account.id}
                            >
                                {account.name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Link to="/movements/new" className="btn btn-success">
                        Nova Movimentação
                    </Link>
                </div>
            </div>
            
            <div>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Conta</Th>
                                <Th>Conta trasferência</Th>
                                <Th>Valor</Th>
                                <Th>Data</Th>
                                <Th>Categoria</Th>
                                <Th>Situação</Th>
                                <Th>Tipo</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((movement: IFinancialMovement) => (
                                <Tr 
                                    key={movement.id}
                                    _hover={{background: "#eee"}}
                                >
                                    <Td>{movement.id}</Td>
                                    <Td>{movement.account.name}</Td>
                                    <Td>{movement.accountToTransfer?.name}</Td>
                                    <Td>R${movement.value.toFixed(2)}</Td>
                                    <Td>{format(new Date(movement.date), 'dd/MM/yyyy HH:mm:ss')}</Td>
                                    <Td>{movement.category.name}</Td>
                                    <Td>
                                        {movement.situation === "PAID" ? "Confirmado" : movement.situation === "CANCELED" ? "Cancelada" : "A Confirmar"}
                                    </Td>
                                    <Td>
                                        {movement.type === "CREDIT" ? "Crédito" : movement.type === "DEBIT" ? "Débito" : "Transferência"}
                                    </Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton 
                                                as={IconButton}
                                                aria-label="Actions"
                                                icon={<BsThreeDotsVertical size={20} />}
                                                variant="ghost"
                                                isDisabled={movement.situation !== "PENDING"}
                                            />
                                            <MenuList>
                                                <MenuItem 
                                                    icon={<BsCheckSquare />}
                                                    onClick={() => financialMovementService.updateMovementSituation(movement.id!)}
                                                >
                                                    Confirmar
                                                </MenuItem>
                                                <MenuItem 
                                                    icon={<BsTrash3 />}
                                                    onClick={() => financialMovementService.remove(movement.id!)}
                                                >
                                                    Cancelar
                                                </MenuItem>
                                            </MenuList>   
                                        </Menu>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
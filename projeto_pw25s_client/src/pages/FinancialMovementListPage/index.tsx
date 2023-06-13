import { IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BsCheckSquare,
    BsTrash3,
    BsThreeDotsVertical,
  } from "react-icons/bs";
import { IFinancialMovement } from "../../commons/interfaces";
import financialMovementService from "../../service/FinancialMovementService";

export function MovementListPage() {

    const [data, setData] = useState<IFinancialMovement[]>([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const [selectedMovementId, setSelectedMovementId] = useState(0);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = () => {
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
    
    return (
        <div className="container">
            <div className="text-center">
                <h3>Movimentações</h3>
            </div>
            
            <div className="d-flex justify-content-end">
                <Link to="/categories/new" className="btn btn-success">
                    Nova Movimentação
                </Link>
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
                                    <Td>{movement.value}</Td>
                                    <Td>{movement.date}</Td>
                                    <Td>{movement.category.name}</Td>
                                    <Td>{movement.situation}</Td>
                                    <Td>{movement.type}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton 
                                                as={IconButton}
                                                aria-label="Actions"
                                                icon={<BsThreeDotsVertical size={20} />}
                                                variant="ghost"
                                            />
                                            <MenuList>
                                                <MenuItem 
                                                    icon={<BsCheckSquare />}
                                                    //onClick={() => onEdit(`/categories/${movement.id}`)}
                                                >
                                                    Confirmar
                                                </MenuItem>
                                                <MenuItem 
                                                    icon={<BsTrash3 />}
                                                    //onClick={() => onRemove(movement.id!)}
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
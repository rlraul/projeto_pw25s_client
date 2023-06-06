import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ICategory } from "../../commons/interfaces";
import { useNavigate } from "react-router-dom";
import CategoryService from "../../service/CategoryService";

export function CategoryListPage() {

    const [data, setData] = useState<ICategory[]>([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    });
    
    const loadData = () => {
        CategoryService.findAll().then((response) => {
            setData(response.data);
            setApiError("");
        }).catch((responseError) => {
            setApiError(responseError.errors);
        });
    }
    
    return (
        <div className="container">
            <h1>Categorias</h1>

            <div>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Nome</Th>
                                <Th>Descrição</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((category: ICategory) => 
                                <Tr 
                                    key={category.id}
                                    _hover={{cursor: "pointer", background: "#eee"}}
                                >
                                    <td>{category.id}</td>
                                    <td>{category.nome}</td>
                                    <td>{category.descricao}</td>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
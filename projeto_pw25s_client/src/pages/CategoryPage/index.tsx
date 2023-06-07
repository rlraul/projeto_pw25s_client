import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ICategory } from "../../commons/interfaces";
import { Link, useNavigate } from "react-router-dom";
import CategoryService from "../../service/CategoryService";

export function CategoryListPage() {

    const [data, setData] = useState<ICategory[]>([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    });
    
    const loadData = () => {
        CategoryService.findAll()
        .then((response) => {
            console.log(response.data);
            setData(response.data);
            setApiError("");
        }).catch((responseError) => {
            setApiError(responseError.errors);
        });
    }
    
    return (
        <div className="container">
            <div className="text-center">
                <h3>Categorias</h3>
            </div>
            
            <div className="d-flex justify-content-end">
                <Link to="/categories/new" className="btn btn-success">
                    Nova Categoria
                </Link>
            </div>
            
            <div>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>Nome</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((category: ICategory) => (
                                <Tr 
                                    key={category.id}
                                    _hover={{cursor: "pointer", background: "#eee"}}
                                >
                                    <Td>{category.id}</Td>
                                    <Td>{category.name}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
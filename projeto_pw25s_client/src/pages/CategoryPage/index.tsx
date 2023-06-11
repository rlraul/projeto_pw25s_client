import { Button, IconButton, Menu, MenuButton, MenuItem, MenuList, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ICategory } from "../../commons/interfaces";
import { Link, useNavigate } from "react-router-dom";
import CategoryService from "../../service/CategoryService";
import {
    BsPencilSquare,
    BsTrash3,
    BsThreeDotsVertical,
  } from "react-icons/bs";

export function CategoryListPage() {

    const [data, setData] = useState<ICategory[]>([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = () => {
        CategoryService.findAll()
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
        CategoryService.remove(id)
          .then((response) => {
            loadData();
            setApiError("");
          })
          .catch((error) => {
            setApiError("Falha ao remover a categoria.");
          });
      };
    
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
                                <Th>#</Th>
                                <Th>Nome</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((category: ICategory) => (
                                <Tr 
                                    key={category.id}
                                    _hover={{background: "#eee"}}
                                >
                                    <Td>{category.id}</Td>
                                    <Td>{category.name}</Td>
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
                                                    icon={<BsPencilSquare />}
                                                    onClick={() => onEdit(`/categories/${category.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem 
                                                    icon={<BsTrash3 />}
                                                    onClick={() => onRemove(category.id!)}
                                                >
                                                    Remover
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
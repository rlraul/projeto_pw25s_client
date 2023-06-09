import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Grid, Heading, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../commons/interfaces";
import { useState, useEffect } from "react";
import CategoryService from "../../service/CategoryService";
import Swal from "sweetalert2";

export function CategoryFormPage() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ICategory>();

    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const [entity, setEntity] = useState<ICategory>({
        id: undefined,
        name: "",
        description: ""
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        if (id) {
            await CategoryService.findOne(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        console.log(response.data);
                        setEntity({
                            id: response.data.id,
                            name: response.data.name,
                            description: response.data.description,
                        });
                        setApiError("");
                    } else {
                        setApiError("Erro ao carregar categoria");
                    }
                })
                .catch((error) => {
                    setApiError("Erro ao carregar categoria");
                })
        }
    }

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data: ICategory) => {
        const category: ICategory = {
          ...data,
          id: entity.id,
        };
        CategoryService.save(category)
          .then((response) => {
            navigate("/categories");

            Swal.fire({
                icon: 'success',
                title: 'Categoria salva',
                text: 'A categoria foi salva com sucesso!',
            });
          })
          .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Categoria não salva',
                text: 'Ocorreu um erro ao salvar a categoria :(',
            });
          });
      };

    return(
        <div className="container w-50">
        <h1 className="fs-2 text-center">Cadastro de categoria</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl isInvalid={errors.name && true} mb={2}>
                    <FormLabel htmlFor="name">Nome</FormLabel>
                    <Input
                        id="name"
                        placeholder="Nome da categoria"
                        {...register("name", {
                        required: "O campo nome é obrigatório",
                        })}
                    />
                    <FormErrorMessage>
                        {errors.name && errors.name.message}
                    </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={errors.description && true} mb={2}>
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <Input
                        id="description"
                        placeholder="Descrição da categoria"
                        {...register("description", {
                            maxLength: { value: 255, message: "A descrição da categoria pode ter na máximo 255 caracteres" },
                        })}
                        type="text"
                    />

                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                </FormControl>
            </Grid>

            <div className="text-center m-2">
                <Button
                    mt={4}
                    colorScheme="green"
                    isLoading={isSubmitting}
                    type="submit"
                >
                    Salvar
                </Button>
            </div>
        </form>

        <div>
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <div className="text-center">
                <Link to="/categories" className="text-primary">Voltar</Link>
            </div>
        </div>
        
    </div>
    );

}
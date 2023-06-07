import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ICategory } from "../../commons/interfaces";
import { useState } from "react";
import CategoryService from "../../service/CategoryService";

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

    const onSubmit = (data: ICategory) => {
        const category: ICategory = {
          ...data,
          //id: entity.id,
        };
        CategoryService.save(category)
          .then((response) => {
            navigate("/categories");
          })
          .catch((error) => {
            setApiError(error.message);
          });
      };

    return(
        <div className="container">
        <h1 className="fs-2 text-center">Cadastro de categoria</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
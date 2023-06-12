import { Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IAccount } from "../../commons/interfaces";
import { useState, useEffect } from "react";
import AccountService from "../../service/AccountService";

export function AccountFormPage() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<IAccount>();

    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const [entity, setEntity] = useState<IAccount>({
        id: undefined,
        name: "",
        number: 0,
        agency: 0,
        bank: 0,
        amount: 0,
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        if (id) {
            await AccountService.findOne(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        console.log(response.data);
                        setEntity({
                            id: response.data.id,
                            name: response.data.name,
                            number: response.data.number,
                            agency: response.data.agency,
                            bank: response.data.bank,
                            amount: response.data.amount,
                        });
                        setApiError("");
                    } else {
                        setApiError("Erro ao carregar conta");
                    }
                })
                .catch((error) => {
                    setApiError("Erro ao carregar conta");
                })
        }
    }

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data: IAccount) => {
        const conta: IAccount = {
          ...data,
          id: entity.id,
        };
        AccountService.save(conta)
          .then((response) => {
            navigate("/accounts");
          })
          .catch((error) => {
            setApiError(error.message);
          });
      };

    return(
        <div className="container">
        <h1 className="fs-2 text-center">Cadastro de conta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.name && true} mb={2}>
                <FormLabel htmlFor="name">Nome</FormLabel>
                <Input
                    id="name"
                    placeholder="Nome/Apelido da conta"
                    {...register("name", {
                    required: "O campo nome é obrigatório",
                    })}
                />
                <FormErrorMessage>
                    {errors.name && errors.name.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.agency && true} mb={2}>
                <FormLabel htmlFor="number">Número</FormLabel>
                <Input
                    id="number"
                    placeholder="Número da conta"
                    {...register("number", {
                        required: "É obrigatório informar o número da conta"
                    })}
                    type="text"
                />

                <FormErrorMessage>
                    {errors.number && errors.number.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.agency && true} mb={2}>
                <FormLabel htmlFor="agency">Agência</FormLabel>
                <Input
                    id="agency"
                    placeholder="Agência da conta"
                    {...register("agency", {
                        required: "É obrigatório informar a agência da conta"
                    })}
                    type="text"
                />

                <FormErrorMessage>
                    {errors.agency && errors.agency.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.agency && true} mb={2}>
                <FormLabel htmlFor="bank">Banco</FormLabel>
                <Input
                    id="bank"
                    placeholder="Banco da conta"
                    {...register("bank", {
                        required: "É obrigatório informar o banco da conta"
                    })}
                    type="text"
                />

                <FormErrorMessage>
                    {errors.bank && errors.bank.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.agency && true} mb={2}>
                <FormLabel htmlFor="amount">Saldo</FormLabel>
                <Input
                    id="amount"
                    placeholder="Saldo da conta"
                    type="text"
                    disabled
                />
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

import { Button, FormControl, FormErrorMessage, FormLabel, Grid, Input, Select, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IAccount, ICategory, IFinancialMovement } from "../../commons/interfaces";
import { useState, useEffect } from "react";
import financialMovementService from "../../service/FinancialMovementService";
import CategoryService from "../../service/CategoryService";
import AccountService from "../../service/AccountService";
import { format } from "date-fns";
import Swal from "sweetalert2";

export function MovementFormPage() {

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<IFinancialMovement>();

    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [showTransferAccount, setShowTransferAccount] = useState(false);

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd-MM-yyyy');
    

    const [entity, setEntity] = useState<IFinancialMovement>({
        id: undefined,
        account: 
            {id: undefined, name: "", number: 0, agency: 0, bank: 0, amount: 0},
        accountToTransfer: 
            {id: undefined, name: "", number: 0, agency: 0, bank: 0, amount: 0},
        value: 0,
        date: formattedDate,
        category: 
            { id: undefined, name: "", description: "" },
        description: "",
        situation: "",
        type: "",
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        //Carega categorias
        await CategoryService.findAll()
            .then((response) => {
                setCategories(response.data);
                setApiError("");
            })
            .catch((erro) => {
                setApiError("Falha ao carregar combo de categorias.");
            });   
            
        //Carega contas
        await AccountService.findAll()
            .then((response) => {
                setAccounts(response.data);
                setApiError("");
            })
            .catch((erro) => {
                setApiError("Falha ao carregar combo de contas.");
            }); 
    }

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const onSubmit = (data: IFinancialMovement) => {
        let movement: IFinancialMovement = {
          ...data,
          id: entity.id,
          account: { id: data.account.id, name: "", number: 0, agency: 0, bank: 0, amount: 0 },
          category: { id: data.category.id, name: "", description: "" },
        };

        if (data.type !== "TRANSFER") {
            movement = {
                ...movement,
                accountToTransfer: null,
            };
        } else {
            movement = {
                ...movement,
                accountToTransfer: {
                    id: data.accountToTransfer.id,
                    name: "",
                    number: 0,
                    agency: 0,
                    bank: 0,
                    amount: 0,
                },
            };
        }
        
        financialMovementService.save(movement)
          .then((response) => {
            navigate("/movements");

            Swal.fire({
                icon: 'success',
                title: 'Movimentação realizada',
                text: 'A movimentação financeira foi realizada com sucesso!',
            });
          })
          .catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Movimentação não realizada',
                text: 'Ocorreu um erro ao salvar a movimentação financeira :(',
            });
          });
    };

    useEffect(() => {
        const formattedDate = format(new Date(), "dd-MM-yyyy'T'HH:mm:ss");
        setValue('date', formattedDate);
      }, [setValue]);

    return(
        <div className="container w-50">
            <h1 className="fs-2 text-center">Cadastro de Movimentação Financeira</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <FormControl isInvalid={errors.type && true} mb={2}>
                    <FormLabel htmlFor="type">Tipo</FormLabel>
                    <Select
                        id="type"
                        placeholder="Selecione o tipo"
                        {...register("type", {
                            required: "O campo tipo é obrigatório",
                        })}
                        onChange={(e) => setShowTransferAccount(e.target.value === "TRANSFER")}
                    >
                        <option key={"CREDIT"} value={"CREDIT"}>Crédito</option>
                        <option key={"DEBIT"} value={"DEBIT"}>Débito</option>
                        <option key={"TRANSFER"} value={"TRANSFER"}>Transferência</option>
                    </Select>

                    <FormErrorMessage>
                        {errors.type && errors.type.message}
                    </FormErrorMessage>
                </FormControl>
                </Grid>
                
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <FormControl isInvalid={errors.account && true} mb={2}>
                        <FormLabel htmlFor="account">Conta</FormLabel>
                        <Select
                            id="account"
                            {...register("account.id", {
                                required: "O campo conta é obrigatório",
                            })}
                        >
                            {accounts.map((account: IAccount) => (
                                <option key={account.id} value={account.id}>
                                {account.name}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.account && errors.account.message}
                        </FormErrorMessage>
                    </FormControl>
                    
                    {showTransferAccount && (
                        <FormControl isInvalid={errors.accountToTransfer && true} mb={2}>
                            <FormLabel htmlFor="accountToTransfer">Conta para transferência</FormLabel>
                            <Select
                                id="accountToTransfer"
                                placeholder="Selecione a conta para transferência"
                                {...register("accountToTransfer.id", {
                                    required: "O campo conta para transferência é obrigatório",
                                })}
                            >
                                {accounts.map((accountToTransfer: IAccount) => (
                                    <option key={accountToTransfer.id} value={accountToTransfer.id}>
                                    {accountToTransfer.name}
                                    </option>
                                ))}
                            </Select>
                            <FormErrorMessage>
                                {errors.accountToTransfer && errors.accountToTransfer.message}
                            </FormErrorMessage>
                        </FormControl>
                    )}
                    
                    <FormControl isInvalid={errors.value && true} mb={2}>
                        <FormLabel htmlFor="value">Valor da movimentação</FormLabel>
                        <Input
                            id="value"
                            placeholder="Valor da movimentação"
                            {...register("value", {
                                required: "É obrigatório informar o valor da movimentação",
                            })}
                            type="number"
                        />
                        <FormErrorMessage>
                            {errors.value && errors.value.message}
                        </FormErrorMessage>
                    </FormControl>
                    
                    <FormControl isInvalid={errors.date && true} mb={2}>
                        <FormLabel htmlFor="date">Data da movimentação</FormLabel>
                            <Input
                            id="date"
                            placeholder="Data da movimentação"
                            {...register("date", {
                                required: "É obrigatório informar a data da movimentação",
                            })}
                            type="date"
                        />
                        <FormErrorMessage>
                            {errors.date && errors.date.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.category && true} mb={2}>
                        <FormLabel htmlFor="category">Categoria</FormLabel>
                        <Select
                            id="category"
                            {...register ("category.id", {
                                required: "O campo categoria é obrigatório",
                            })}
                        >
                            {categories.map((category: ICategory) => (
                                <option key={category.id} value={category.id}>
                                {category.name}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.category && errors.category.message}
                        </FormErrorMessage>
                    </FormControl>
                
                    <FormControl isInvalid={errors.situation && true} mb={2}>
                        <FormLabel htmlFor="situation">Situação</FormLabel>
                        <Select
                            id="situation"
                            {...register("situation", {
                                required: "O campo Situação é obrigatório",
                            })}
                        >
                            <option key={"PAID"} value={"PAID"}>
                                Confirmada
                            </option>
                            <option key={"PENDING"} value={"PENDING"}>
                                A Confirmar
                            </option>
                        </Select>
                        <FormErrorMessage>
                            {errors.situation && errors.situation.message}
                        </FormErrorMessage>
                    </FormControl>
                </Grid>

                <FormControl isInvalid={errors.description && true} mb={2}>
                    <FormLabel htmlFor="description">Descrição</FormLabel>
                    <Textarea
                        id="description"
                        placeholder="Descrição da movimentação"
                        {...register("description", {
                        maxLength: {
                            value: 150,
                            message: "A descrição pode ter no máximo 150 caracteres",
                        },
                        })}
                        size="sm"
                    />
                    <FormErrorMessage>
                        {errors.description && errors.description.message}
                    </FormErrorMessage>
                 </FormControl>

                {apiError && <div className="alert alert-danger">{apiError}</div>}
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
                <div className="text-center">
                    <Link to="/movements" className="text-primary">Voltar</Link>
                </div>
            </div>
        </div>
    );

}
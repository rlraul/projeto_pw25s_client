import { IAccount } from "../commons/interfaces";
import { api } from "../lib/axios"

const findAll = () => {
    return api.get("/accounts");
}

const save = (account: IAccount) => {
    return api.post("/accounts", account);
  };
  
  const remove = (id: number) => {
    return api.delete(`/accounts/${id}`);
  };
  
  const findOne = (id: number) => {
    return api.get(`/accounts/${id}`);
  };
  
const AccountService = {
    findAll,
    save,
    remove,
    findOne,
}

export default AccountService;
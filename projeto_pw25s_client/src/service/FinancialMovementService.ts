
import { IFinancialMovement } from "../commons/interfaces";
import { api } from "../lib/axios"

const findAll = () => {
    return api.get("/movements");
}

const save = (financialMovemente: IFinancialMovement) => {
    return api.post("/movements", financialMovemente);
  };
  
  const remove = (id: number) => {
    return api.delete(`/movements/${id}`);
  };
  
  const findOne = (id: number) => {
    return api.get(`/movements/${id}`);
  };
  

const financialMovementService = {
    findAll,
    save,
    remove,
    findOne,
}

export default financialMovementService;

import { IFinancialMovement } from "../commons/interfaces";
import { api } from "../lib/axios"

const findAll = () => {
    return api.get("/movements");
}

const findAllByAccountId = (id: number) => {
  return api.get(`/movements/account/${id}`);
}

const save = (financialMovement: IFinancialMovement) => {
    return api.post("/movements", financialMovement);
};

const updateMovementSituation = (id: number) => {
  return api.post(`/movements/${id}`);
};
  
const remove = (id: number) => {
  return api.delete(`/movements/${id}`);
};

const findOne = (id: number) => {
  return api.get(`/movements/${id}`);
};

const findAllLastFiveCreditsMovements = () => {
  return api.get("/movements/page?page=0&size=5&type=CREDIT");
}

const findAllLastFiveDebitsMovements = () => {
  return api.get("/movements/page?page=0&size=5&type=DEBIT");
}

const financialMovementService = {
    findAll,
    save,
    updateMovementSituation,
    remove,
    findOne,
    findAllByAccountId,
    findAllLastFiveCreditsMovements,
    findAllLastFiveDebitsMovements,
}

export default financialMovementService;
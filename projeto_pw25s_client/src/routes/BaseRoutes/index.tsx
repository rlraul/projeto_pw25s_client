import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { AuthenticatedRoutes } from "../AuthenticatedRoutes";
import { SignupPage } from "../../pages/SignupPage";
import { HomePage } from "../../pages/HomePage";
import { CategoryListPage } from "../../pages/CategoryListPage";
import { CategoryFormPage } from "../../pages/CategoryFormPage";
import { AccountListPage } from "../../pages/AccountListPage";
import { AccountFormPage } from "../../pages/AccountFormPage";
import { MovementListPage } from "../../pages/FinancialMovementListPage";
import { MovementFormPage } from "../../pages/FinancialMovementFormPage";

export function BaseRoutes() {
    return (
      <>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
  
          {/* Protected Routes */}
          <Route element={<AuthenticatedRoutes />}> 
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<HomePage />} /> 

            <Route path="/categories" element={<CategoryListPage />} />
            <Route path="/categories/new" element={<CategoryFormPage />} />
            <Route path="/categories/:id" element={<CategoryFormPage />} />

            <Route path="/accounts" element={<AccountListPage />} />
            <Route path="/accounts/new" element={<AccountFormPage />} />
            <Route path="/accounts/:id" element={<AccountFormPage />} />

            <Route path="/movements" element={<MovementListPage />} />
            <Route path="/movements/new" element={<MovementFormPage />} />
            
          </Route>
  
        </Routes>
      </>
    );
  }
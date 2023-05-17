import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function LoginPage() {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [apiError, setApiError] = useState(false);
    const [userAuthenticated, setUserAuthenticated] = useState(false);
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const navigate = useNavigate();

    return (
        <h1>Login - Page</h1>
    );
}
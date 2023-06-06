import bodyImg from "../../assets/stonks.png";

export function HomePage() {

    return(
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <div>
                <h1 className="row">Controle Financeiro</h1>
                <h1 className="row">
                    <img src={bodyImg} alt="Stonks"></img>
                </h1>
            </div>
        </div>
    );

}
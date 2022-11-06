const BundleCard = ({plan, goToCheckout}) => {
    const {offerInfo, paymentInfo} = plan;

    return (
        <div className="uk-placeholder">
            <h3>{offerInfo.name}</h3>

            <p><span>{paymentInfo.currency}</span>{paymentInfo.price}<span>/mês</span></p>

            <div>
                <button type="button" onClick={() => {goToCheckout(plan)}}>Assinar agora</button>

                <p>Cancele quando quiser</p>
            </div>
        </div>
    );
};

export default BundleCard;
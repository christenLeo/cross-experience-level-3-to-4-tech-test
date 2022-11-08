const BundleCard = ({plan, goToCheckout, id}) => {
    const {offerInfo, paymentInfo} = plan;

    return (
        <div id={id} className="uk-placeholder bundle-card">
            <h3>{offerInfo.name}</h3>

            <div className="bundle-card_card-content">
                <p className="card-content_price-info"><span>{paymentInfo.currency} </span>{paymentInfo.price} <span>/ mês</span></p>
                <div>
                <button type="button" className="uk-button uk-button-default button" onClick={() => {goToCheckout(plan)}}>Assinar agora</button>

                <p>Cancele quando quiser</p>
                </div>
            </div>
        </div>
    );
};

export default BundleCard;
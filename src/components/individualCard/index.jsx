const IndividualCard = ({plan, goToCheckout, id}) => {
    const {offerInfo, paymentInfo} = plan;

    const mountBenefits = offerInfo.benefits.map((benefit) => {
        return (
            <p className="individual-card-benefits" key={benefit}><span style={{color: 'green'}}>✓</span>{benefit}</p>
        );
    });

    return (
        <div className="uk-placeholder uk-margin-large-bottom uk-text-center individual-card">
            <div>
                <h3>{offerInfo.name}</h3>
                
                {mountBenefits}
            </div>

            <div>
                <p className="card-content_price-info"><span>{paymentInfo.currency} </span>{paymentInfo.price}<span> / mês</span></p>

                <button type="button" className="uk-button uk-button-default button button-indv" onClick={() => {goToCheckout(plan)}}>Assinar agora</button>

                <p>Cancele quando quiser</p>
            </div>
        </div>
    );
};

export default IndividualCard;
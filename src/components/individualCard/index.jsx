const IndividualCard = ({plan, goToCheckout, id}) => {
    const {offerInfo, paymentInfo} = plan;

    const mountBenefits = offerInfo.benefits.map((benefit) => {
        return (
            <p key={benefit}><span style={{color: 'green'}}>✓</span>{benefit}</p>
        );
    });

    return (
        <div id={id} className="uk-placeholder uk-margin-large-bottom uk-text-center">
            <h3>{offerInfo.name}</h3>
            {mountBenefits}

            <p><span>{paymentInfo.currency}</span>{paymentInfo.price}<span>/mês</span></p>

            <button type="button" onClick={() => {goToCheckout(plan)}}>Assinar agora</button>

            <p>Cancele quando quiser</p>
        </div>
    );
};

export default IndividualCard;
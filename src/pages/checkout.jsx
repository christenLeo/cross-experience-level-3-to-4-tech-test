import Head from 'next/head'
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Container, Footer, Layout, Navbar } from '../components';

const HomePage = () => {
  const [planInfo, setPlanInfo] = useState({});

  useEffect(() => {
    const savedPlanInfo = localStorage.getItem('planInfo');
    const objPlanInfo = JSON.parse(savedPlanInfo);
    setPlanInfo(objPlanInfo);
  }, []);

  console.log(planInfo);

  return (
    <Layout>
      <Head>
        <title>Jusbrasil: Tech test (level 03 to 04)</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Navbar />

      <Container>
        <div className="uk-card uk-card-default uk-card-body">
          <div className="uk-placeholder uk-margin-bottom">
            <div className="uk-grid uk-child-width-expand">
              <div>
                <h2 className="uk-text-meta">Produto</h2>
                <p>{planInfo.offerInfo !== undefined ? planInfo.offerInfo.name : "Nome do Plano"}</p>
              </div>
              <div>
                <h2 className="uk-text-meta">Total</h2>
                <p><span>{planInfo.paymentInfo !== undefined ? planInfo.paymentInfo.currency : "R$"} </span>{planInfo.paymentInfo !== undefined ? planInfo.paymentInfo.price : "00,00"}</p>
              </div>
            </div>
          </div>
          <div className="uk-grid uk-child-width-1-2@m">
            <div>
              <h3><i data-uk-icon="icon: credit-card"></i> Cartão de crédito</h3>
              <p>Preencha abaixo todos os campos para comtinuar com a sua compra.</p>

              <form>
                <fieldset className="uk-fieldset">
                  <div className="uk-margin">
                    <input type="text" className="uk-input" placeholder="NUMERO DO CARTÃO" />
                  </div>
                  <div className="uk-grid uk-child-width-1-4" data-uk-grid>
                    <div>
                      <input type="text" className="uk-input" placeholder="MÊS" maxLength="2" />
                    </div>
                    <div>
                      <input type="text" className="uk-input" placeholder="ANO" maxLength="4" />
                    </div>
                    <div>
                      <input type="text" className="uk-input" placeholder="CVV" maxLength="4" />
                    </div>
                  </div>
                  <div className="uk-margin">
                    <input type="text" className="uk-input" placeholder="NOME IMPRESSO NO CARTÃO" />
                  </div>
                </fieldset>
                <input type="submit" value="ASSINAR AGORA!" className="uk-button uk-button-primary" />
                <p>Cancele quando quiser!</p>
              </form>

              <p>Ao prosseguir você estará concordando com os <a href="">Termos de uso do Jusbrasil</a>.</p>
            </div>
            <div>
              <h3><i data-uk-icon="icon: lock" className="uk-text-success"></i> Ambiente seguro</h3>
              <p>O Jusbrasil toma as melhores precauções para proteger seus dados sensíveis. Nós não armazenamos seu código de segurança e todas as outras informações são devidamente encriptadas e guardadas com segurança em nossos servidores para a cobrança de sua assinatura Pesquisa Jurídica Básica.</p>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.15.2/dist/js/uikit.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.15.2/dist/js/uikit-icons.min.js"></Script>
    </Layout>
  )
}

export default HomePage;
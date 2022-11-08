import Head from 'next/head'
import Script from 'next/script';
import Router from 'next/router';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Footer, Layout, Navbar, Hero } from '../components';
import { baseUrl } from '../resources/constants/urls';
import IndividualCard from '../components/individualCard';
import BundleCard from '../components/bundleCard';
import icon from '../../public/favicon.png';

const HomePage = () => {
  const [individuals, setIndividuals] = useState([]);
  const [bundles, setBundles] = useState([]);

  // auxiliar functions
  const dividePlans = (plans) => {
    const indv = [];
    const bun = [];
    
    for (let i = 0; i < plans.length; i++) {
      if (plans[i].type === 'individual') {
        indv.push(plans[i]);
      }
      else if (plans[i].type === 'bundle') {
        bun.push(plans[i])
      }
    }
    
    setIndividuals(indv);
    setBundles(bun);
  };

  const goToCheckout = (planInfo) => {
    const jsonPlanInfo = JSON.stringify(planInfo)
    localStorage.setItem('planInfo', jsonPlanInfo);
    Router.push('/checkout')
  };
  
  const getPlans = async () =>{
    try {
      const {data} = await axios.get(`${baseUrl}plans`);
      dividePlans(data.data.availablePlans);
    } catch (err) {
      console.log(err);
    }
  }

  // page life cycle actions
  useEffect(() => {
    getPlans();
  },[]);

    
  // building components
  const buildIndividualCards = individuals.map((plan, i) => {
    return (
      <IndividualCard id={`individ${i+1}`} key={plan.id} plan={{offerInfo: plan.offerInfo, paymentInfo: plan.paymentInfo}} goToCheckout={goToCheckout}/>
    );
  });

  const buildBundleCards = bundles.map((plan, i) => {
    return (
      <BundleCard id={`bundle${i+1}`} key={plan.id} plan={{offerInfo: plan.offerInfo, paymentInfo: plan.paymentInfo}} goToCheckout={goToCheckout}/>
    );
  });

  return (
    <Layout>
      <Head>
        <title>Jusbrasil: Tech test (level 03 to 04)</title>
        <link rel="icon" href={icon} />
      </Head>

      <Navbar />

      <Hero>
        <h1 className="uk-margin-large-bottom">Informação jurídica. <strong>Mais rápida do que nunca.</strong></h1>
        <a href="#planos" className="uk-button uk-button-primary">Conheça nossos planos</a>
      </Hero>

      <Container>
        <h2 className="uk-margin-large uk-text-center">A maior fonte de informação jurídica do Brasil, ao seu alcance.</h2>
        <div className="uk-grid uk-child-width-1-1d@s uk-child-width-expand@m uk-margin-large-bottom" data-uk-grid>
          <div>
            <div className="uk-margin-large-bottom">
              <span data-uk-icon="icon: home; ratio: 2" className="uk-text-primary uk-margin-small-bottom"></span>
              <h3 className="uk-margin-remove">O acervo mais completo de Jurisprudência</h3>
              <p>Reunimos +90 milhões de julgados e milhares de súmulas, de 96 sistemas de tribunais e com ementa pré-formatada para citação.</p>
            </div>
            <div className="uk-margin-bottom">
              <span data-uk-icon="icon: folder; ratio: 2" className="uk-text-primary uk-margin-small-bottom"></span>
              <h3 className="uk-margin-remove">Processos atualizados com rapidez e precisão</h3>
              <p>Acervo de 290 milhões de processos que são atualizados por 91 diários oficiais de justiça e mais de 250 sistemas de tribunais.</p>
            </div>
          </div>
          <div>
            <div className="uk-margin-large-bottom">
              <span data-uk-icon="icon: file-text; ratio: 2" className="uk-text-primary uk-margin-small-bottom"></span>
              <h3 className="uk-margin-remove">Modelos e Peças para facilitar o seu dia a dia</h3>
              <p>Milhares de novos modelos toda semana. São mais de 25 milhões de petições, contestações e procurações disponíveis.</p>
            </div>
            <div className="uk-margin-bottom">
              <span data-uk-icon="icon: file-edit; ratio: 2" className="uk-text-primary uk-margin-small-bottom"></span>
              <h3 className="uk-margin-remove">Leis, Códigos e Decretos de todo país</h3>
              <p>Disponibilizamos um acervo amplo e organizado com uma busca precisa para otimizar a sua pesquisa.</p>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <h2 id="planos" className="uk-text-center uk-margin-bottom">Conheça nossos planos</h2>
        <div className="uk-column-1-3">
            {buildIndividualCards}
        </div>
      </Container>

      <Container>
        <div className="uk-column-1-2">
          <div>
            <img src="https://static.jusbr.com/deadpool/pro/image/recommended_plan_offer@2x.png" style={{ maxHeight: 400, marginBottom: 32 }} />
          </div>
          <div>
            <h3>Pacotes recomendados</h3>
            {buildBundleCards}
          </div>
        </div>
        <p className="uk-text-center uk-margin-large-bottom">
          Precisa de um plano para seu escritório, empresa ou órgão público? <a href="https://conteudo.jusbrasil.com.br/oportunidade-pro-pj?utm_source=jusbrasil&utm_medium=web&utm_campaign=new_landing_pro_basic">Conheça o plano Jusbrasil PRO para multiusuários</a>
        </p>
      </Container>

      <Footer />
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.15.2/dist/js/uikit.min.js"/>
      <Script src="https://cdn.jsdelivr.net/npm/uikit@3.15.2/dist/js/uikit-icons.min.js"/>
    </Layout>
  )
}

export default HomePage;
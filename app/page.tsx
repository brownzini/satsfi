import Image from 'next/image';

import SvgModel from "@/utils/svg";

export default function Home() {
  return (
    <main>
      <section className="initial flex">
        <div className="initialArea flex">

          <div className="description-area">
            <h2 className="description-title">
              Receba doações <br />com <span className="trueMoney">dinheiro</span><br /> de verdade
            </h2>
            <p className="subTitle">
              Tenha suas doações recebidas em <span className="trueMoney">satoshis</span> de uma forma que seus doadores não precisem cair em doxxing
            </p>
          </div>

          <div className="satsfi-area flex fd">
            <div className="satsfi-title-area flex">
              <h1 className="logo-title"> SatsFI </h1>
            </div>
            <div className="button-area-satsfi flex">
              <button className="launch-button">
                INICIAR
              </button>
            </div>
          </div>

        </div>
      </section>
      <section className="topic flex">

        <div className="card-privacy flex fd">
          <div className="cardHead">
            <h2> Privacidade </h2>
          </div>
          <div className="cardBody flex">
            <SvgModel
              name="privacity"
              width="75%"
              height="75%"
            />
          </div>
          <div className="cardFooter flex">
            <h2>Seus seguidores que contribuem com doações podem permanecer completamente em anonimato. Além das próprias doações ficarem salvas com você e não no sistema</h2>
          </div>
        </div>

        <div className="card-ai flex fd">
          <div className="cardHead">
            <h2> Inteligência artificial </h2>
          </div>
          <div className="cardBody flex">
            <SvgModel
              name="brain-ai"
              width="75%"
              height="75%"
            />
          </div>
          <div className="cardFooter flex">
            <h2>
              Seus seguidores podem utilizar o modelo de inteligência artificial na exibição de doações assim como diversos outros serviços</h2>
          </div>
        </div>

        <div className="card-fee flex fd">
          <div className="cardHead">
            <h2> Taxa 2.50%  </h2>
          </div>
          <div className="cardBody flex">
            <SvgModel
              name="fee"
              width="100%"
              height="100%"
            />
          </div>
          <div className="cardFooter flex">
            <h2>Seus seguidores podem utilizar o modelo de inteligência artificial na exibição de doações</h2>
          </div>
        </div>

      </section>
      <section className="howto flex">
        <div className="wrappedArea flex">
          <div className="videoSection">
            <Image
              id="cellImage"
              width={740}
              height={385}
              src="/img/cell.jpg"
              alt="cell"
            />
            <video
              id="video"
              disablePictureInPicture
              controls={false}
              playsInline
              autoPlay
              loop
              muted
            >
              <source src={''} />
            </video>
          </div>
          <div className="descriptionArea flex fd">
            <div className="titleArea wh100">
              <h2>Como usar ?</h2>
              <h3> 1° - Abra a pagina inicial <br />
               2° - Crie seu hub de acordo com suas preferências de configuração <br /> 
               3° - Importe o hub com a chave gerada e gerêncie suas doações <br /> 
               4° - Utilizar </h3>
              <button id="paperButton">Ler paper</button>
            </div>
          </div>
        </div>
      </section>
      <section className="lightning-area flex">
        <h2> Transações realizadas via Lightning Network </h2>
      </section>
      <section className="faq flex">
        <div className="faq-area flex fd">
          <div className="icon-area flex">
            <h2>SatsFI</h2>
          </div>
          <div className="tou-area">
            <h2>Termos de uso</h2>
          </div>
        </div>
      </section>
    </main>
  );
}

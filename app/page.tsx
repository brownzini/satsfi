import SvgModel from "@/utils/svg";

export default function Home() {
  return (
    <main>
      <section className="initial flex">
        <div className="initialArea flex">
          <div className="description-area">
            <h2 className="description-title">
              Receba doações <br />com <span className="trueMoney">dinheiro</span> de verdade
            </h2>
            <p className="subTitle">
              Tenha suas doações recebidas em <span className="trueMoney">satoshis</span> de uma forma que seus doadores não precisem cair em doxxing
            </p>
          </div>

          <div className="satsfi-area flex fd">
            <div className="satsfi-title-area flex">
              <h1 className="logo-title"> SatsFI </h1>
            </div>
            <div className="svg-satsfi flex">
              <button className="launch-button">
                INICIAR
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="topic flex">
        <h2> topico </h2>
      </section>
      <section className="howto flex">
        <h2> como usar </h2>
      </section>
      <section className="lightning-area flex">
        <h2> lightning </h2>
      </section>
      <section className="faq flex">
        <h2> como usar </h2>
      </section>
    </main>
  );
}

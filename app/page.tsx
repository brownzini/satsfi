import Link from "next/link";
import Image from "next/image";

import SvgModel from "@/utils/svg";

export default function Home() {
  return (
    <main>
      <section className="initial flex">
        <div className="initialArea flex">
          <div className="description-area">
            <h2 className="description-title">
              Receba <br /> doações com{" "}
              <span className="trueMoney">bitcoin</span>
              <br /> ao vivo sem complicações
            </h2>
            <p className="subTitle">
              e faça seus viewers perceberem que vale a pena doar. De uma forma
              super simples assim como em outros serviços que você está
              acostumado.
            </p>
          </div>

          <div className="satsfi-area flex fd">
            <div className="satsfi-title-area flex">
              <h1 className="logo-title"> SatsFI </h1>
            </div>
            <div className="button-area-satsfi flex">
              <button className="launch-button">
                <Link id="link-initial-button-style" href="/dashboard">
                  INICIAR
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="topic flex">
        <div className="card-privacy flex fd">
          <div className="cardHead">
            <h2> Informações </h2>
          </div>
          <div className="cardBody flex">
            <SvgModel name="privacity" width="75%" height="75%" />
          </div>
          <div className="cardFooter flex">
            <h2>
              {" "}
              Quem doou ? Quanto doou ? Sobre oque falou ? Não fica salvo, assim
              como seu saldo.{" "}
            </h2>
          </div>
        </div>

        <div className="card-ai flex fd">
          <div className="cardHead">
            <h2> Saques ? </h2>
          </div>
          <div className="cardBody flex">
            <SvgModel name="no_withdraw" width="75%" height="75%" />
          </div>
          <div className="cardFooter flex">
            <h2>
              {" "}
              Não tem saques pois todas as transações são direcionadas ao seu
              endereço lightning{" "}
            </h2>
          </div>
        </div>

        <div className="card-fee flex fd">
          <div className="cardHead">
            <h2> Direito de participação </h2>
          </div>
          <div className="cardBody flex">
            <SvgModel name="fee" width="100%" height="100%" />
          </div>
          <div className="cardFooter flex">
            <h2>
              {" "}
              É um modo onde viewers podem participar dos ganhos de doações
              através de enquetes, mídias e campanhas{" "}
            </h2>
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
            {false && (
              <video
                id="video"
                disablePictureInPicture
                controls={false}
                playsInline
                autoPlay
                loop
                muted
              >
                <source src={""} />
              </video>
            )}
          </div>
          <div className="descriptionArea flex fd">
            <div className="titleArea wh100">
              <h2>Funcionalidades</h2>
              <h3>
                <b>Donate normal</b> - Mensagem | Gravar Audio | Audio de video
                do youtubue <br />
                <b>Enquete</b> - Criar enquete e votar <br />
                <b>Chroma Key</b> - Trocar fundo da webcam do streamer <br />
                <b>Chamadas</b> - Falar ao vivo com o streamer <br />
                <b>Campanha</b> - Você pode comprar uma porcentagem das doações{" "}
                <br />
              </h3>
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
            <Link id="link-initial-button-style" href="/terms">
              <h2>Termos de uso</h2>
            </Link>
            <br />
          </div>
            <h2 id="email-footer">satsfisuporte@outlook.com.br</h2>
        </div>
      </section>
    </main>
  );
}

import SvgModel from "@/utils/svg";
import Card from "./Card";
import {
    CardsContainer,
    CardsContent,
    CardsWrapper,
    ChartContainer,
    ChartWrapper,
    CleanAllContainer,
    Container,
    ImportContainer,
    ImportWrapper,
    MonthlyCard,
    MonthlyCardBody,
    MonthlyCardBodySvgArea,
    MonthlyCardBodyTitle,
    MonthlyCardBodyTitleArea,
    MonthlyCardHeader,
    MonthlyCardTitle,
    SvgIconInImportArea,
} from "./styles";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});


export default function Overview() {
    const series  = [{
        name: 'Satoshis',
        data: [30,40,23, 210]
      }]

      const options = {
        chart: {
          type: 'area' as any,
          stacked: false,
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          } as any,
          toolbar: {
            autoSelected: 'zoom'
          }  as any
        },
        colors: ["#FAD40F"],
        dataLabels: {
          enabled: false
        },
        markers: {
          size: 0,
        },
        title: {
          text: 'Doações durante o mês',
          align: 'left' as any
        },
        grid: {
            show: false
          },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
          },
        },
        xaxis: {
          type: 'datetime' as any,
          categories: ['2024-05-05', '2024-05-07', '2024-05-11', '2024-05-12'],
        },
    
    }

    return (
        <Container className="flex fd">

            <CardsContainer className="flex fd">
                <ImportContainer>
                    <CleanAllContainer> 
                        <SvgIconInImportArea 
                            className="flex"
                            onClick={() => console.log('remove tudo')}
                        >
                            <SvgModel 
                                name="delete" 
                                width="50%"
                                height="50%"
                            />
                            Limpar
                        </SvgIconInImportArea>
                    </CleanAllContainer>
                    <ImportWrapper
                        className="flex"
                        onClick={() => console.log('importar')}
                    >
                        importar
                    </ImportWrapper>
                </ImportContainer>

                <CardsContent>
                    <CardsWrapper className="flex">
                        <Card day="Hoje" amount="1,2k" hasExport />
                        <Card day="Semanal" amount="2,5k" hasExport={false} />
                        <MonthlyCard className="flex fd">
                            <MonthlyCardHeader className="flex">
                                <MonthlyCardTitle> Mensal </MonthlyCardTitle>
                            </MonthlyCardHeader>
                            <MonthlyCardBody className="flex">
                                <MonthlyCardBodySvgArea>
                                    <SvgModel
                                        name="satoshi"
                                        width="75%"
                                        height="100%"
                                    />
                                </MonthlyCardBodySvgArea>
                                <MonthlyCardBodyTitleArea>
                                    <MonthlyCardBodyTitle>1,2k</MonthlyCardBodyTitle>
                                </MonthlyCardBodyTitleArea>
                            </MonthlyCardBody>
                        </MonthlyCard>
                    </CardsWrapper>
                </CardsContent>
            </CardsContainer>

            <ChartContainer id="chart" className="flex">
                <ChartWrapper>
                    <Chart
                        type="area"
                        width={"100%"}
                        height={"100%"}
                        options={options}
                        series={series}
                    />
                </ChartWrapper>
            </ChartContainer>

        </Container>
    );
}
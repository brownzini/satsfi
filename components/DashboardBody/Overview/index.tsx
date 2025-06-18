import dynamic from "next/dynamic";

import {
    useEffect,
    useState
} from "react";

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
    MonthlyCardBodyArea,
    MonthlyCardBodyTitle,
    MonthlyCardBodyTitleArea,
    MonthlyCardHeader,
    MonthlyCardTitle,
    SvgIconInImportArea,
} from "./styles";

//Components
import Card from "./Card";
import CSVImporter from "./Import";

//Contexts
import { useMessage } from "@/contexts/useMessage";
import { useData } from "@/contexts/useData";

//Utils
import SvgModel from "@/utils/svg";
import { getToday } from "@/utils/Date";

interface SeriesProps {
    name: string;
    data: any[];
}

interface DonationProps {
    date: any;
    value: string;
}

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false
});

export default function Overview() {
    const { data, setData } = useData();

    const defaultSeries = [{
        name: 'Satoshis',
        data: []
    }];

    const [options, setOptions] = useState<any>({
        chart: {
            type: 'area' as any,
            stacked: false,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            } as any,
            toolbar: {
                autoSelected: 'zoom'
            } as any
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
                stops: [0]
            },
        },
        xaxis: {
            type: 'datetime' as any,
            categories: [],
        },

    });
    const [series, setSeries] = useState<SeriesProps[]>(defaultSeries);

    const [donates, setDonates] = useState<DonationProps[]>(data.donations);

    const [monthAmount, setMonthAmount] = useState<string>('0');
    const [totalAmount, setTotalAmount] = useState<string>('0');

    const { status } = useMessage();

    const handleRemove = () => {
        setOptions((prevOptions: any) => ({
            ...prevOptions,
            xaxis: {
                ...prevOptions.xaxis,
                categories: [],
            },
        }));
        setSeries([{
            name: 'Satoshis',
            data: []
        }]);
        setDonates([]);
        setData(prevData => ({...prevData, donations: []}));
        setMonthAmount('0');
        setTotalAmount('0');
    }

    const filterAmount = (value: string) => {
        const integerAmount = parseInt(value);

        if (integerAmount < 1000) {
            return value;
        }

        if (integerAmount >= 1000 && integerAmount < 10000) {
            return (integerAmount / 1000) + 'K';
        }

        if (integerAmount >= 10000 && integerAmount < 100000) {
            return (integerAmount / 1000) + 'K';
        }

        //1 milhão - 10 milhões
        if (integerAmount >= 100000 && integerAmount < 1000000) {
            return (integerAmount / 1000) + 'K';
        }

        //1 milhão - 10 milhões
        if (integerAmount >= 1000000 && integerAmount < 10000000) {
            return (integerAmount / 1000000) + 'M';
        }

        //10 milhão - 100 milhões
        if (integerAmount >= 10000000 && integerAmount < 100000000) {
            return (integerAmount / 1000000) + 'M';
        }

        //100 milhão - 1 Bilhão
        if (integerAmount >= 100000000 && integerAmount < 1000000000) {
            return (integerAmount / 1000000) + 'M';
        }

        //1 Bilhão - 10 Bilhões
        if (integerAmount >= 1000000000 && integerAmount < 10000000000) {
            return (integerAmount / 1000000) + 'B';
        }

        //10 Bilhões - 100 Bilhões
        if (integerAmount >= 10000000000 && integerAmount < 100000000000) {
            return (integerAmount / 1000000) + 'B';
        }

        //100 Bilhões - 1 Trilhão
        if (integerAmount >= 100000000000 && integerAmount < 1000000000000) {
            return (integerAmount / 1000000) + 'B';
        }

    }

    const getValuesByMonth = (donates: any[]) => {
        const sumByMonth: { [key: string]: number } = {};

        for (const donate of donates) {
            const [year, month] = donate.date.split('-').slice(0, 2);
            const key = `${year}-${month}`;

            if (!sumByMonth[key]) {
                sumByMonth[key] = 0;
            }
            sumByMonth[key] += Number(donate.value);
        }

        const now = new Date();
        const month = (now.getMonth() + 1 < 10) ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
        const year = now.getFullYear().toString();

        const monthValue = sumByMonth[year + '-' + month];

        if (monthValue) {
            return monthValue;
        } else {
            return 0;
        }
    };

    const sumDailyDonations = () => {

        const today = getToday();

        const donationsForToday = data.donations.filter(item => item.date === today);

        let sum = 0;

        donationsForToday.forEach(item => {
            sum += parseFloat(item.value);
        });

        const result = filterAmount(sum.toString());
        
        return (result) ? result : '0';
    };

    const calculateTotalValue = (): string => {
        let sum = 0;
        data.donations.forEach(item => {
            sum += parseFloat(item.value);
        });
        const result = filterAmount(sum.toString());
        return (result) ? result : '0';
    }

    useEffect(() => {
        const organizingData = () => {
            const donatesPerDay: any = {};

            donates.forEach((item: any) => {
                const { date, value } = item;
                if (!donatesPerDay[date]) {
                    donatesPerDay[date] = 0;
                }
                donatesPerDay[date] += parseInt(value);
            });

            const collectionOrdered = Object.entries(donatesPerDay).sort((a, b) => {
                const dateA: any = new Date(a[0]);
                const dateB: any = new Date(b[0]);
                return dateA - dateB;
            });

            const completedDonates = collectionOrdered.reverse();

            const categories = completedDonates.map(([date, _]) => date);
            const series = collectionOrdered.map(([, value]) => Number(value));

            setOptions((prevOptions: any) => ({
                ...prevOptions,
                xaxis: {
                    ...prevOptions.xaxis,
                    categories: categories,
                },
            }));
            setSeries(prevSeriesData => [{ name: 'Satoshis', data: series }]);

            const monthResultAmount = filterAmount(getValuesByMonth(donates).toString());
            const totalResultAmount = filterAmount(calculateTotalValue().toString());
            if (monthResultAmount) {
                setMonthAmount(monthResultAmount);
            }

            if (totalResultAmount) {
                setTotalAmount((totalResultAmount).toString());
            }

        }
        if (donates.length > 0) organizingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [donates]);

    return (
        <Container className="flex fd">
            <CardsContainer className="flex fd">
                <ImportContainer>
                    <CleanAllContainer>
                        <SvgIconInImportArea
                            className="flex"
                            onClick={handleRemove}
                        >

                            <p> Limpar </p>
                        </SvgIconInImportArea>
                    </CleanAllContainer>
                    <ImportWrapper className="flex">
                        {(!status)
                            ? <CSVImporter setDonates={setDonates} />
                            : <SvgModel
                                name="loading"
                                width="25%"
                                height="25%"
                            />
                        }
                    </ImportWrapper>
                </ImportContainer>

                <CardsContent>
                    <CardsWrapper className="flex">
                        <Card day="Hoje" amount={sumDailyDonations()} hasExport />
                        <Card day="Mensal" amount={monthAmount} hasExport={false} />
                        <MonthlyCard className="flex fd">
                            <MonthlyCardHeader className="flex">
                                <MonthlyCardTitle> Total </MonthlyCardTitle>
                            </MonthlyCardHeader>
                            <MonthlyCardBody className="flex">
                                <MonthlyCardBodyTitleArea className="flex">
                                    <MonthlyCardBodyArea className="flex">
                                        <MonthlyCardBodyTitle>{totalAmount}</MonthlyCardBodyTitle>
                                    </MonthlyCardBodyArea>
                                </MonthlyCardBodyTitleArea>
                            </MonthlyCardBody>
                        </MonthlyCard>
                    </CardsWrapper>
                </CardsContent>
            </CardsContainer>

            <ChartContainer
                id="chart"
                className="flex"
            >
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
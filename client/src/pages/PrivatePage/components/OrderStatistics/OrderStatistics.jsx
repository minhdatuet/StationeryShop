import React, { useEffect, useState } from "react";
import clsx from "clsx";
import style from "./OrderStatistics.module.scss";
import ReactApexCharts from "react-apexcharts";
import { Button } from "flowbite-react";
import { apiGetQuantityStatistic } from "../../../../services/order";

function OrderStatistics() {
    const [isClickChartQuantity, setIsClickChartQuantity] = useState(true);
    const [isClickChartMoney, setIsClickChartMoney] = useState(false);

    const [quantityStatistic, setQuantityStatistic] = useState([]);
    const [quantityStatisticLabel, setQuantityStatisticLabel] = useState([]);

    const [moneyStatistic, setMoneyStatistic] = useState([]);
    const [moneyStatisticLabel, setMoneyStatisticLabel] = useState([]);

    useEffect(() => {
        const quantityStatisticTemp = [];
        const quantityStatisticLabel = [];

        const moneyStatisticTemp = [];
        const moneyStatisticLabel = [];

        const fetchData = async () => {
            const response = await apiGetQuantityStatistic();
            const fetchedData = response.data;

            for (let i = 0; i < fetchedData.length; i++) {
                quantityStatisticTemp.push(parseInt(fetchedData[i].totalQuantity));
                quantityStatisticLabel.push(fetchedData[i].Product.Catalog.catalogName);

                moneyStatisticTemp.push(parseFloat(fetchedData[i].totalValue));
                moneyStatisticLabel.push(fetchedData[i].Product.Catalog.catalogName);
            }

            setQuantityStatistic(quantityStatisticTemp);
            setQuantityStatisticLabel(quantityStatisticLabel);

            setMoneyStatistic(moneyStatisticTemp);
            setMoneyStatisticLabel(moneyStatisticLabel);
        };

        fetchData();
    }, []);

    const [chartDataOfQuantity, setChartDataOfQuantity] = useState({
        series: quantityStatistic,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: quantityStatisticLabel,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            tooltip: {
                enabled: true,
                y: {
                    formatter: function (value) {
                        return value + " items";
                    }
                }
            }
        },
    });

    const handleIsClickChartQuantity = () => {
        if (!isClickChartQuantity) {
            setChartDataOfQuantity({
                series: quantityStatistic,
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: quantityStatisticLabel,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }],
                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: function (value) {
                                return value + " items";
                            }
                        }
                    }
                },
            });
            setIsClickChartQuantity(true);
            setIsClickChartMoney(false);
        }
    }

    const [chartDataOfMoney, setChartDataOfMoney] = useState({
        series: moneyStatistic,
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: moneyStatisticLabel,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            tooltip: {
                enabled: true,
                y: {
                    formatter: function (value) {
                        return value + " $";
                    }
                }
            }
        },
    });

    const handleIsClickChartMoney = () => {
        if (!isClickChartMoney) {
            setChartDataOfMoney({
                series: moneyStatistic,
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: moneyStatisticLabel,
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }],
                    tooltip: {
                        enabled: true,
                        y: {
                            formatter: function (value) {
                                return value + " $";
                            }
                        }
                    }
                },
            });
            setIsClickChartMoney(true);
            setIsClickChartQuantity(false);
        }
    }

    return (
        <div className={clsx(style.container)}>
            <Button.Group className={clsx(style["button-container"])}>
                <Button
                    color="gray"
                    onClick={handleIsClickChartQuantity}
                    className={clsx(style.button)}
                >
                    Quantity
                </Button>
                <Button
                    color="gray"
                    onClick={handleIsClickChartMoney}
                    className={clsx(style.button)}
                >
                    Money
                </Button>
            </Button.Group>

            <div className={clsx(style["chart-container"])}>
                {isClickChartQuantity && (
                    <ReactApexCharts
                        type="pie"
                        options={{
                            chart: {
                                width: 500,
                                type: 'pie',
                            },
                            labels: quantityStatisticLabel,
                            tooltip: {
                                enabled: true,
                                y: {
                                    formatter: function (value) {
                                        return value + " items";
                                    }
                                }
                            },
                            noData: { text: "Empty Data" }
                        }}
                        series={quantityStatistic}
                        width={500}
                    />

                )}

                {isClickChartMoney && (
                    <ReactApexCharts
                        type="pie"
                        options={{
                            chart: {
                                width: 500,
                                type: 'pie',
                            },
                            labels: moneyStatisticLabel,
                            tooltip: {
                                enabled: true,
                                y: {
                                    formatter: function (value) {
                                        return value + " $";
                                    }
                                }
                            },
                            noData: { text: "Empty Data" }
                        }}
                        series={moneyStatistic}
                        width={500}
                    />
                )}
            </div>
        </div>
    );
}

export default OrderStatistics;

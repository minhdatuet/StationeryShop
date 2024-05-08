import React, { useState } from "react";
import clsx from "clsx";
import style from "./OrderStatistics.module.scss";
import ReactApexCharts from "react-apexcharts";
import { Button } from "flowbite-react";

function OrderStatistics() {
    const [isClickChartQuantity, setIsClickChartQuantity] = useState(true);
    const [isClickChartMoney, setIsClickChartMoney] = useState(false);

    const [chartDataOfQuantity, setChartDataOfQuantity] = useState({
        series: [44, 55, 13, 43, 22, 30, 11, 20, 24, 17],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Backpack', 'Book', 'Casio', 'Desklamp', 'Notebook', 'Pen', 'School Supply', 'Stationery Supply', 'Story Book', 'Table And Chair'],
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

    const [chartDataOfMoney, setChartDataOfMoney] = useState({
        series: [44, 55, 13, 43, 22, 30, 11, 20, 24, 17],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['Backpack', 'Book', 'Casio', 'Desklamp', 'Notebook', 'Pen', 'School Supply', 'Stationery Supply', 'Story Book', 'Table And Chair'],
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


    const handleIsClickChartQuantity = () => {
        if (!isClickChartQuantity) {
            setChartDataOfQuantity({
                series: [44, 55, 13, 43, 22, 30, 11, 20, 24, 17],
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: ['Backpack', 'Book', 'Casio', 'Desklamp', 'Notebook', 'Pen', 'School Supply', 'Stationery Supply', 'Story Book', 'Table And Chair'],
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
        }
        setIsClickChartQuantity(true);
        setIsClickChartMoney(false);
    }

    const handleIsClickChartMoney = () => {
        if (!isClickChartMoney) {
            setChartDataOfMoney({
                series: [44, 55, 13, 43, 22, 30, 11, 20, 24, 17],
                options: {
                    chart: {
                        width: 380,
                        type: 'pie',
                    },
                    labels: ['Backpack', 'Book', 'Casio', 'Desklamp', 'Notebook', 'Pen', 'School Supply', 'Stationery Supply', 'Story Book', 'Table And Chair'],
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
        }
        setIsClickChartMoney(true);
        setIsClickChartQuantity(false);
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
                    <ReactApexCharts options={chartDataOfQuantity.options} series={chartDataOfQuantity.series} type="pie" width={500} />
                )}

                {isClickChartMoney && (
                    <ReactApexCharts options={chartDataOfMoney.options} series={chartDataOfMoney.series} type="pie" width={500} />
                )}
            </div>
        </div>
    );
}

export default OrderStatistics;

import React from 'react';
import { Bar } from 'react-chartjs-2';



export default class Chat extends React.Component {
    state = {
        chartData: {
            labels: ['Red', 'Orange', 'Blue'],
            // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
            datasets: [
                {
                    label: 'Popularity of colours',
                    data: [55, 23, 96],
                    // you can set indiviual colors for each bar
                    backgroundColor: [
                        'rgba(255, 255, 255, 0.6)',
                        'rgba(255, 255, 255, 0.6)',
                        'rgba(255, 255, 255, 0.6)',
                    ],
                    borderWidth: 1,
                }
            ]
        }
    }
    render() {
        const barData = [
            {
                data: {
                    id: "bitcoin",
                    rank: "1",
                    symbol: "BTC",
                    name: "Bitcoin",
                    priceUsd: "33692.0391437919079095"
                }, timestamp: 1625898595698
            }

        ]

        return (
            <div>
                <Bar
                    data={this.state.chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Cryptocurrency prices"
                            },
                            legend: {
                                display: true,
                                position: "bottom"
                            }
                        }
                    }}
                />
            </div>
        );
    }
}
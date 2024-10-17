// @ts-nocheck

import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonButtons, IonBackButton, IonLoading } from '@ionic/react';
import { useFetch } from '../hooks/useFetch'
import { getCurrentDateFormatted } from '../helpers/getCurrentDate'

const FuelPrices: React.FC = () => {

    const currentYear = new Date().getFullYear()

    const [fuelName, setFuelName] = useState("")
    const [date, setDate] = useState(currentYear)
    const [price, setPrice] = useState()
    const { resp, loading, error } = useFetch(`https://api.digital.gob.do/v1/fuels?date=${date}`)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="bg-blue-600">
                    <IonButtons slot="start">
                        <IonBackButton text="Volver" defaultHref="/" />
                    </IonButtons>
                    <IonTitle className="text-white">Precios de Combustibles</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="p-6 bg-gray-100">
                <div className="flex flex-col gap-4 mb-4 mt-5">

                    <IonItem>
                        <div>
                            <IonLabel>Selecciona Combustible</IonLabel>
                            <IonSelect value={fuelName} onIonChange={e => setFuelName(e.target.value)} placeholder="Seleccionar">

                                <IonSelectOption value="">
                                    Todos
                                </IonSelectOption>

                                {
                                    resp && resp.data.map(fuel => (
                                        <IonSelectOption key={fuel.id} value={fuel.name}>
                                            {fuel.name}
                                        </IonSelectOption>
                                    ))
                                }

                            </IonSelect>
                        </div>
                    </IonItem>

                    <IonItem>
                        <div>
                            <IonLabel>Selecciona Fecha</IonLabel>
                            <IonInput onIonInput={e => {setDate(e.detail.value)}} value={date} className='text-gray-200' type='date'></IonInput>
                        </div>
                    </IonItem>

                    <IonItem className='flex flex-col gap-3'>
                        <div>
                            <h2>Filtrar por precio (RD$)</h2>
                            <IonInput value={price} type="number" placeholder="Ingrese precio máximo" onIonInput={e=>setPrice(Number(e.target.value))} />
                        </div>
                    </IonItem>
                </div>

                <IonList>
                    <div className='flex flex-col gap-1 items-center w-full mb-5'>
                        <h1>Combustibles</h1>
                    </div>

                    <IonLoading
                        isOpen={loading}
                        message={'Cargando...'}
                        duration={5000}
                    />
                    
                    {
                        resp?.data.length === 0 ? <h1 className='text-center text-sm text-gray-400'>No hay contenido para mostrar</h1> : ""
                    }

                    {

                        fuelName ? (

                            resp?.data.filter(fuel => fuel.name === fuelName).map(fuel => (
                                price ? (
                                    fuel.price <= price ? (
                                        
                                        <IonItem key={fuel.id}>
                                            <IonLabel>
                                                <h2 className="text-lg font-bold">{fuel.name}</h2>
                                                <p className="text-gray-700">$ {fuel.price}</p>
                                                <p className="text-gray-500">{fuel.date}</p>
                                            </IonLabel>
                                        </IonItem>
                                    ) : ""
                                ) : (

                                    <IonItem key={fuel.id}>
                                        <IonLabel>
                                            <h2 className="text-lg font-bold">{fuel.name}</h2>
                                            <p className="text-gray-700">$ {fuel.price}</p>
                                            <p className="text-gray-500">{fuel.date}</p>
                                        </IonLabel>
                                    </IonItem>
                                )
                            ))
                        ) : (
                            resp?.data.map(fuel => (
                                price ? (
                                    fuel.price <= price ? (
                                        <IonItem key={fuel.id}>
                                            <IonLabel>
                                                <h2 className="text-lg font-bold">{fuel.name}</h2>
                                                <p className="text-gray-700">$ {fuel.price}</p>
                                                <p className="text-gray-500">{fuel.date}</p>
                                            </IonLabel>
                                        </IonItem>
                                    ) : ""
                                ) : (

                                    <IonItem key={fuel.id}>
                                        <IonLabel>
                                            <h2 className="text-lg font-bold">{fuel.name}</h2>
                                            <p className="text-gray-700">$ {fuel.price}</p>
                                            <p className="text-gray-500">{fuel.date}</p>
                                        </IonLabel>
                                    </IonItem>
                                )
                            ))
                        )
                    }

                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default FuelPrices;
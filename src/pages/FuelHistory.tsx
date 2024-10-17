// @ts-nocheck

import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonSelect, IonSelectOption, IonButtons, IonBackButton, IonLoading } from '@ionic/react';
import { useFetch } from '../hooks/useFetch';

const FuelHistory: React.FC = () => {

    const currentYear = new Date().getFullYear()

    const [year, setYear] = useState(currentYear)
    const { resp, loading, error } = useFetch(`https://api.digital.gob.do/v1/fuels?date=${year}`)

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className="bg-blue-600">
                    <IonButtons slot="start">
                        <IonBackButton text="Volver" defaultHref="/" />
                    </IonButtons>
                    <IonTitle className="text-white">Historial de Precios</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="p-6 bg-gray-100">
                <div className="flex flex-col gap-4 mb-4 mt-5">

                    <IonItem>
                        <IonLabel>Año</IonLabel>
                        <IonSelect value={year} onIonChange={e => setYear(e.target.value)} placeholder="Seleccionar año">

                            {Array.from({ length: 31 }, (_, i) => (
                                <IonSelectOption key={2000 + i} value={`${2000 + i}`}>
                                    {2000 + i}
                                </IonSelectOption>
                            ))}
                        </IonSelect>
                    </IonItem>
                </div>

                <IonLoading
                    isOpen={loading}
                    message={'Cargando...'}
                    duration={5000}
                />

                <IonList>

                    <div className='flex flex-col gap-1 items-center w-full mb-5'>
                        <h1>Historial de Precios</h1>
                    </div>

                    {
                        resp?.data.length === 0?<h1 className='text-center text-sm text-gray-400'>No hay contenido para mostrar</h1>:""
                    }

                    {
                        resp?.data.map(fuel=>{
                            return(
                                <IonItem key={fuel.id}>
                                    <IonLabel>
                                        <h2 className="text-lg font-bold">{fuel.name}</h2>
                                        <p className="text-gray-700">$ {fuel.price}</p>
                                        <p className="text-gray-500">{fuel.date}</p>
                                    </IonLabel>
                                </IonItem>
                            )
                        })
                    }

                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default FuelHistory;

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonButton } from '@ionic/react';
import Weather from '../components/Weather';
import './home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="bg-blue-600">
          <IonTitle className="text-white">GasApp DOM</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding scroll-content">
        <div className="home-content text-center">
          <img className="mx-auto w-32 h-auto rounded-full mt-3" src="logo.png" alt="logo" />
          <IonText className="flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-blue-700">Bienvenido a GasApp DOM</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-200">
              Consulta y compara los precios de los combustibles en tiempo real en la República Dominicana.
            </p>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-200">
              Encuentra rápidamente los precios más accesibles y ahorra tiempo y dinero.
            </p>
          </IonText>

          <div className="mt-10 flex justify-center gap-4 p-5">
            <IonButton className="text-white text-sm w-1/2" routerLink="/fuel-prices">
              Precios de Combustibles
            </IonButton>
            <IonButton className="text-white text-sm w-1/2" routerLink="/price-history">
              Historial de Precios
            </IonButton>
          </div>
        </div>

        <div className="mt-10">
          <Weather />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
